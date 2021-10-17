<script lang="ts">
	import { ResponseError } from "@huokan/huokanclient-ts";

	import { onMount } from "svelte";

	import Router, { RouteDefinition } from "svelte-spa-router";
	import OrganizationsAdmin from "./components/pages/admin/OrganizationsAdmin.svelte";
	import DepositsPage from "./components/pages/DepositsPage.svelte";
	import HomePage from "./components/pages/HomePage.svelte";
	import LogInPage from "./components/pages/LogInPage.svelte";
	import LoggedInTemplate from "./components/templates/LoggedInTemplate.svelte";
	import NotLoggedInTemplate from "./components/templates/NotLoggedInTemplate.svelte";
	import { checkUrlForLogIn } from "./hooks/LogInHook";
	import { Logger } from "./Logger";
	import { apiKeyStore } from "./stores/ApiKeyStore";
	import { unauthenticatedRepositoriesStore } from "./stores/RepositoryStore";

	import "carbon-components-svelte/css/all.css";

	const routes: RouteDefinition = {
		"/": HomePage,
		"/deposits": DepositsPage,
		"/admin/organizations": OrganizationsAdmin,
	};

	onMount(async () => {
		try {
			await checkUrlForLogIn(
				$unauthenticatedRepositoriesStore.discordAuthorizationRepository
			);
		} catch (err) {
			// TODO Display an error to the user
			if (err instanceof ResponseError && err.response.status == 401) {
			} else {
				Logger.error(err);
			}
		} finally {
			window.history.replaceState(
				window.history.state,
				document.title,
				// TODO be more safe about this
				window.location.href.replace(window.location.search, "")
			);
		}
	});
</script>

{#if $apiKeyStore != null}
	<LoggedInTemplate>
		<Router routes="{routes}" />
	</LoggedInTemplate>
{:else}
	<NotLoggedInTemplate>
		<LogInPage />
	</NotLoggedInTemplate>
{/if}
