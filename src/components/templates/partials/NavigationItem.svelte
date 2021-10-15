<script lang="ts">
	import { link } from "svelte-spa-router";

	export let href: string;
</script>

<a href="{href}" use:link class="block text-white hover:underline px-3 py-2">
	<slot />
</a>
