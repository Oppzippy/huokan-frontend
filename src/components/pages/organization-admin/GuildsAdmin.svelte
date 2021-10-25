<script lang="ts">
	import type { Guild } from "@huokan/huokanclient-ts";
	import { DataTable, DataTableSkeleton } from "carbon-components-svelte";

	import { authenticatedRepositoriesStore } from "../../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../../stores/current-user/OrganizationsStore";

	import CreateGuildForm from "../../forms/CreateGuildForm.svelte";

	$: guildRepository = $authenticatedRepositoriesStore?.guildRepository;

	let guildsPromise: Promise<Guild[]> | undefined;
	$: if ($selectedOrganizationStore != null && guildRepository != null) {
		guildsPromise = guildRepository.getGuilds(
			$selectedOrganizationStore?.id
		);
	}

	function submit() {
		if ($selectedOrganizationStore != null) {
			guildsPromise = guildRepository?.getGuilds(
				$selectedOrganizationStore?.id
			);
		}
	}
</script>

<CreateGuildForm on:submitSuccees="{submit}" />

<h3>Guilds</h3>

{#if guildsPromise != undefined}
	{#await guildsPromise}
		<DataTableSkeleton showHeader="{false}" showToolbar="{false}" />
	{:then guilds}
		<DataTable
			sortable
			headers="{[
				{ key: 'name', value: 'Name' },
				{ key: 'realm', value: 'Realm' },
			]}"
			rows="{guilds}"
		/>
	{/await}
{:else}
	You are not logged in.
{/if}
