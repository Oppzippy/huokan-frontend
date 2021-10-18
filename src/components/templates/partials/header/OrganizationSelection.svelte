<script lang="ts">
	import { Dropdown, DropdownSkeleton } from "carbon-components-svelte";
	import { organizationsStore } from "../../../../stores/current-user/OrganizationsStore";

	$: items = $organizationsStore?.map((organization) => ({
		id: organization.id,
		text: organization.name,
	}));

	let selectedIndex = 0;
</script>

{#if items == undefined}
	<DropdownSkeleton />
{:else if items.length == 0}
	<Dropdown
		hideLabel="{true}"
		selectedIndex="{0}"
		items="{[{ id: '0', text: 'No organizations' }]}"
	/>
{:else}
	<Dropdown
		hideLabel="{true}"
		bind:selectedIndex
		titleText="Organization"
		items="{items}"
	/>
{/if}
