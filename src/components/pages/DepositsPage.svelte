<script lang="ts">
	import type { Deposit } from "@huokan/huokan-api-client";

	import {
		Button,
		DataTable,
		DataTableSkeleton,
	} from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../stores/current-user/OrganizationsStore";
	import GuildSelection from "../inputs/GuildSelection.svelte";
	import Gold from "../text/Gold.svelte";

	let selectedGuildId: string | undefined;
	let pageLimit = 25;

	let deposits: Deposit[] | null;
	$: if (
		$authenticatedRepositoriesStore != null &&
		$selectedOrganizationStore != null &&
		selectedGuildId != null
	) {
		$authenticatedRepositoriesStore.depositRepository
			.getDeposits(
				$selectedOrganizationStore.id,
				selectedGuildId,
				pageLimit
			)
			.then((newDeposits) => (deposits = newDeposits));
	}

	function showNewerPage() {
		if (
			$authenticatedRepositoriesStore != null &&
			$selectedOrganizationStore != null &&
			selectedGuildId != null &&
			deposits != null &&
			deposits.length >= 1
		) {
			const oldDeposits = deposits;
			$authenticatedRepositoriesStore?.depositRepository
				.getNewerPage(
					$selectedOrganizationStore.id,
					selectedGuildId,
					deposits[deposits.length - 1].id,
					pageLimit
				)
				.then((newDeposits) => {
					if (newDeposits.length < pageLimit) {
						newDeposits = [
							...oldDeposits.slice(
								newDeposits.length - pageLimit,
								oldDeposits.length
							),
							...newDeposits,
						];
					}
					deposits = newDeposits;
				});
		}
	}

	function showOlderPage() {
		if (
			$authenticatedRepositoriesStore != null &&
			$selectedOrganizationStore != null &&
			selectedGuildId != null &&
			deposits != null &&
			deposits.length >= 1
		) {
			$authenticatedRepositoriesStore?.depositRepository
				.getOlderPage(
					$selectedOrganizationStore.id,
					selectedGuildId,
					deposits[0].id,
					pageLimit
				)
				.then((newDeposits) => {
					if (newDeposits.length > 0) {
						deposits = newDeposits;
					}
				});
		}
	}

	const dataTableHeaders = [
		{ key: "id", value: "ID" },
		{ key: "characterName", value: "Character Name" },
		{ key: "money", value: "Deposit" },
		{ key: "endorsements", value: "Endorsements" },
		{
			key: "approximateDepositTimestamp",
			value: "Approximate Deposit Time",
		},
	];
</script>

{#if $selectedOrganizationStore != null}
	<GuildSelection
		organizationId="{$selectedOrganizationStore.id}"
		bind:selectedGuildId
	/>
	{#if selectedGuildId != null}
		{#if deposits == null}
			<DataTableSkeleton
				headers="{dataTableHeaders}"
				rows="{pageLimit}"
			/>
		{:else if deposits != null}
			<Button on:click="{showNewerPage}">Newer</Button>
			<Button on:click="{showOlderPage}">Older</Button>
			<DataTable
				headers="{dataTableHeaders}"
				rows="{deposits
					.map((deposit) => ({
						...deposit,
						money: deposit.depositInCopper,
						approximateDepositTimestamp:
							deposit.approximateDepositTimestamp.toLocaleString(),
					}))
					.reverse()}"
			>
				<svelte:fragment slot="cell" let:cell>
					{#if cell.key == "money"}
						<Gold amount="{cell.value}" />
					{:else}
						{cell.value}
					{/if}
				</svelte:fragment>
			</DataTable>
		{/if}
	{/if}
{:else}
	No organization is selected.
{/if}
