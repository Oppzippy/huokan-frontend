<script lang="ts">
	import { apiKeyStore } from "../../../stores/ApiKeyStore";

	import NavigationItem from "./NavigationItem.svelte";

	const logOut = apiKeyStore.logOut.bind(apiKeyStore);
</script>

<ul class="flex flex-wrap flex-col md:flex-row items-stretch justify-center ">
	<li><NavigationItem href="/">Home</NavigationItem></li>
	<li><NavigationItem href="/deposits">Deposits</NavigationItem></li>
</ul>
