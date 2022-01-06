<script lang="ts">
	import {
		GlobalPermission,
		OrganizationPermission,
	} from "@huokan/huokan-api-client";
	import { onMount } from "svelte";
	import { Route } from "tinro";
	import { Loading } from "carbon-components-svelte";
	import OrganizationsAdmin from "./components/pages/admin/OrganizationsAdmin.svelte";
	import DepositsPage from "./components/pages/DepositsPage.svelte";
	import HomePage from "./components/pages/HomePage.svelte";
	import LogInPage from "./components/pages/LogInPage.svelte";
	import LoggedInTemplate from "./components/templates/LoggedInTemplate.svelte";
	import NotLoggedInTemplate from "./components/templates/NotLoggedInTemplate.svelte";
	import { checkUrlForLogIn } from "./hooks/LogInHook";
	import { apiKeyStore } from "./stores/current-user/ApiKeyStore";
	import { unauthenticatedRepositoriesStore } from "./stores/UnauthenticatedRepositoriesStore";
	import GuildsAdmin from "./components/pages/organization-admin/GuildsAdmin.svelte";
	import { selectedOrganizationPermissionStore } from "./stores/current-user/SelectedOrganizationPermissionStore";
	import { globalPermissionStore } from "./stores/current-user/GlobalPermissionStore";
	import ToastContainer from "./components/toast-notification/ToastContainer.svelte";
	import { userStore } from "./stores/current-user/UserStore";

	import "carbon-components-svelte/css/all.css";

	$: isOrganizationAdmin =
		$selectedOrganizationPermissionStore?.has(
			OrganizationPermission.Administrator
		) ?? false;
	$: isGlobalAdmin =
		$globalPermissionStore?.has(GlobalPermission.Administrator) ?? false;

	onMount(async () => {
		await checkUrlForLogIn(
			$unauthenticatedRepositoriesStore.discordAuthorizationRepository
		);
		window.history.replaceState(
			window.history.state,
			document.title,
			// TODO be more safe about this
			window.location.href.replace(window.location.search, "")
		);
	});
</script>

{#if $userStore != null}
	<LoggedInTemplate>
		<Route path="/"><HomePage /></Route>
		<Route path="/deposits"><DepositsPage /></Route>
		{#if isOrganizationAdmin}
			<Route path="/organization-admin/*" firstmatch>
				<Route path="/guilds"><GuildsAdmin /></Route>
			</Route>
		{/if}
		{#if isGlobalAdmin}
			<Route path="/admin/*" firstmatch>
				<Route path="/organizations"><OrganizationsAdmin /></Route>
			</Route>
		{/if}
	</LoggedInTemplate>
{:else}
	<NotLoggedInTemplate>
		{#if $apiKeyStore != null}
			<Loading />
		{:else}
			<LogInPage />
		{/if}
	</NotLoggedInTemplate>
{/if}

<ToastContainer />
