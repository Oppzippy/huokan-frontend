<script lang="ts">
	import { apiKeyStore } from "../../../stores/ApiKeyStore";
	import { currentUserStore } from "../../../stores/CurrentUserStore";
	import LightButton from "../../inputs/Buttons/NavigationButton.svelte";
	import OrganizationSelection from "../../inputs/OrganizationSelection.svelte";
</script>

<div class="flex flex-col md:flex-row md:items-center ">
	<OrganizationSelection />
	{#if $currentUserStore != null}
		<LightButton on:click="{apiKeyStore.logOut}">Log Out</LightButton>
	{/if}
</div>
