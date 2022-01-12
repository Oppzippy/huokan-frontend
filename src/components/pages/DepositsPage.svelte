<script lang="ts">
	import type { Deposit } from "@huokan/huokan-api-client";

	import { DataTable } from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../stores/current-user/OrganizationsStore";
	import GuildSelection from "../inputs/GuildSelection.svelte";

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
			<!-- id may be added to Deposit in the future, so we ensure that id will override our array index id -->
			<DataTable
				headers="{[
					{ key: 'characterName', value: 'Character Name' },
					{ key: 'depositInCopper', value: 'Deposit in Copper' },
					{ key: 'endorsements', value: 'Endorsements' },
				]}"
				rows="{deposits.map((deposit, i) => ({ id: i, ...deposit }))}"
			/>
		{:else}
			No guild selected.
		{/if}
	{/await}
{:else}
	No organization is selected.
{/if}
