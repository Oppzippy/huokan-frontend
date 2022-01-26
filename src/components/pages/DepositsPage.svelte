<script lang="ts">
	import type { Deposit } from "@huokan/huokan-api-client";

	import { DataTable } from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../stores/current-user/OrganizationsStore";
	import GuildSelection from "../inputs/GuildSelection.svelte";
	import Gold from "../text/Gold.svelte";

	let selectedGuildId: string | undefined;

	let depositsPromise: Promise<Deposit[]> | null;
	$: if (
		$authenticatedRepositoriesStore != null &&
		$selectedOrganizationStore != null &&
		selectedGuildId != null
	) {
		depositsPromise =
			$authenticatedRepositoriesStore.depositRepository.getDeposits(
				$selectedOrganizationStore.id,
				selectedGuildId
			);
	}
</script>

{#if $selectedOrganizationStore != null}
	<GuildSelection
		organizationId="{$selectedOrganizationStore.id}"
		bind:selectedGuildId
	/>
	{#await depositsPromise}
		Loading deposits...
	{:then deposits}
		{#if deposits != null}
			<DataTable
				headers="{[
					{ key: 'characterName', value: 'Character Name' },
					{ key: 'money', value: 'Deposit' },
					{ key: 'endorsements', value: 'Endorsements' },
					{
						key: 'approximateDepositTimestamp',
						value: 'Approximate Deposit Time',
					},
				]}"
				rows="{deposits.map((deposit) => ({
					...deposit,
					money: deposit.depositInCopper,
					approximateDepositTimestamp:
						deposit.approximateDepositTimestamp.toLocaleString(),
				}))}"
			>
				<svelte:fragment slot="cell" let:cell>
					{#if cell.key == "money"}
						<Gold amount="{cell.value}" />
					{:else}
						{cell.value}
					{/if}
				</svelte:fragment>
			</DataTable>
		{:else}
			No guild selected.
		{/if}
	{/await}
{:else}
	No organization is selected.
{/if}
