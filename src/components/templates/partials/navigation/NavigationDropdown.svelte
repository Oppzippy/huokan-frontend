<script lang="ts">
	export let text: string;
	let forceShow = false;
</script>

<div class="relative dropdown">
	<button
		class="block text-white hover:bg-gray-700 focus:bg-gray-700 md:hover:bg-transparent md:focus:bg-transparent hover:underline px-3 py-2 "
	>
		{text}
	</button>
	<div
		class="dropdown-items bg-black flex flex-col md:absolute md:top-100 md:left-0"
		class:forceShow
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.dropdown {
		& > .dropdown-items {
			display: none;
		}

		&:hover > .dropdown-items {
			display: block;
		}
	}
</style>
