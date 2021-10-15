<script lang="ts">
	import { apiKeyStore } from "../../../stores/ApiKeyStore";

	import { currentUserStore } from "../../../stores/CurrentUserStore";
	import NavigationItem from "./NavigationItem.svelte";

	const logOut = apiKeyStore.logOut.bind(apiKeyStore);
</script>

<ul
	class="flex flex-wrap flex-col md:flex-row items-stretch justify-center bg-black "
>
	<li><NavigationItem href="/">Home</NavigationItem></li>
	<li><NavigationItem href="/deposits">Deposits</NavigationItem></li>
	{#if $currentUserStore != null}
		<li><button on:click="{logOut}">Log out</button></li>
	{/if}
</ul>
