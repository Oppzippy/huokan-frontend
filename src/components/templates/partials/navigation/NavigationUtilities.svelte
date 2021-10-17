<script lang="ts">
	import { apiKeyStore } from "../../../../stores/ApiKeyStore";
	import { currentUserStore } from "../../../../stores/CurrentUserStore";
	import NavigationButton from "../../../inputs/Buttons/NavigationButton.svelte";
	import OrganizationSelection from "../../../inputs/OrganizationSelection.svelte";
</script>

<div class="flex flex-col md:flex-row md:items-center ">
	<OrganizationSelection />
	{#if $currentUserStore != null}
		<NavigationButton on:click="{apiKeyStore.logOut}"
			>Log Out</NavigationButton
		>
	{/if}
</div>
