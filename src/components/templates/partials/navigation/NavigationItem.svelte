<script lang="ts">
	import { link } from "svelte-spa-router";

	export let href: string;
</script>

<a
	href="{href}"
	use:link
	class="block text-white hover:bg-gray-700 focus:bg-gray-700 md:hover:bg-transparent md:focus:bg-transparent hover:underline px-3 py-2 "
>
	<slot />
</a>
