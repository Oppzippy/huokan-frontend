<script lang="ts">
	import { authenticatedRepositoriesStore } from "../../../stores/RepositoryStore";
	$: organizationRepository =
		$authenticatedRepositoriesStore?.organizationRepository;
	$: organizationsPromise = organizationRepository?.getOrganizations();
</script>

<h3>Add Organization</h3>
<div>
	<label for="organization-name">Organization Name</label>
	<input id="organization-name" type="text" required />
</div>

<h3>Organizations</h3>

{#if organizationsPromise != undefined}
	{#await organizationsPromise}
		Loading organizations
	{:then organizations}
		<ul>
			{#each organizations as organization}
				<li>{organization.name}</li>
			{/each}
		</ul>
	{/await}
{:else}
	You are not logged in.
{/if}
