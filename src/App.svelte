<script lang="ts">
	import { ResponseError } from "@huokan/huokanclient-ts";

	import { onMount } from "svelte";

	import Router, { RouteDefinition } from "svelte-spa-router";
	import HomePage from "./components/pages/HomePage.svelte";
	import LogInPage from "./components/pages/LogInPage.svelte";
	import MainTemplate from "./components/templates/MainTemplate.svelte";
	import { checkUrlForLogIn } from "./hooks/LogInHook";
	import { Logger } from "./Logger";
	import { apiKeyStore } from "./stores/ApiKeyStore";
	import { unauthenticatedRepositoriesStore } from "./stores/RepositoryStore";

	const routes: RouteDefinition = {
		"/": HomePage,
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
	<MainTemplate>
		<Router routes="{routes}" />
	</MainTemplate>
{:else}
	<LogInPage />
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
