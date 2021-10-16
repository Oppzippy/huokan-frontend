<script lang="ts">
	import BaseButton from "./BaseButton.svelte";
	export let href: string | null = "";
</script>

<BaseButton
	on:click
	href="{href}"
	class="block text-white hover:bg-gray-700 focus:bg-gray-700 md:hover:bg-transparent md:focus:bg-transparent hover:underline px-3 py-2"
>
	<slot />
</BaseButton>
