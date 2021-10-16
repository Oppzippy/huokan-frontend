<script lang="ts">
	import { authenticatedRepositoriesStore } from "../../stores/RepositoryStore";

	const organizationsPromise =
		$authenticatedRepositoriesStore?.organizationRepository.getOrganizations() ??
		Promise.reject("Not logged in.");
</script>

{#await organizationsPromise then organizations}
	{#if organizations.length != 0}
		<select>
			{#each organizations as organization}
				<option value="{organization.id}">{organization.name}</option>
			{/each}
		</select>
	{:else}
		<div class="p-3 text-white">You are not in any organizations!</div>
	{/if}
{/await}
