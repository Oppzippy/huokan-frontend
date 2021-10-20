<script lang="ts">
	import { DataTable, DataTableSkeleton } from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../../stores/current-user/AuthenticatedRepositoriesStore";
	import CreateOrganizationForm from "../../forms/CreateOrganizationForm.svelte";
	$: organizationRepository =
		$authenticatedRepositoriesStore?.organizationRepository;
	$: organizationsPromise = organizationRepository?.getOrganizations();

	async function submit() {
		organizationsPromise = organizationRepository?.getOrganizations();
	}
</script>

<h3>Add Organization</h3>
<CreateOrganizationForm on:submitSuccees="{submit}" />

<h3>Organizations</h3>

{#if organizationsPromise != undefined}
	{#await organizationsPromise}
		<DataTableSkeleton showHeader="{false}" showToolbar="{false}" />
	{:then organizations}
		<DataTable
			sortable
			headers="{[
				{ key: 'name', value: 'Name' },
				{ key: 'slug', value: 'Slug' },
				{ key: 'discordGuildId', value: 'Discord Guild ID' },
			]}"
			rows="{organizations}"
		/>
	{/await}
{:else}
	You are not logged in.
{/if}
