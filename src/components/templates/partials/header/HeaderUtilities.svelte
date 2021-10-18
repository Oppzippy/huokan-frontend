<script lang="ts">
	import { apiKeyStore } from "../../../../stores/current-user/ApiKeyStore";
	import { userStore } from "../../../../stores/current-user/UserStore";
	import NavigationButton from "../../../inputs/Buttons/NavigationButton.svelte";
	import OrganizationSelection from "../../../inputs/OrganizationSelection.svelte";
</script>

<div class="flex flex-col md:flex-row md:items-center ">
	<OrganizationSelection />
	{#if $userStore != null}
		<NavigationButton on:click="{apiKeyStore.logOut}"
			>Log Out</NavigationButton
		>
	{/if}
</div>
