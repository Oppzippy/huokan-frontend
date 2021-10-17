<script>
	import Navigation from "./partials/navigation/Navigation.svelte";
	import NavigationUtilities from "./partials/navigation/NavigationUtilities.svelte";
</script>

<nav
	class="flex flex-col md:flex-row md:justify-between items-stretch md:items-center bg-black md:px-20"
>
	<Navigation />
	<NavigationUtilities />
</nav>

<main>
	<slot />
</main>

<footer></footer>
