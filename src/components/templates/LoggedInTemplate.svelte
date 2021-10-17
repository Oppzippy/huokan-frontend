<script>
	import { Content } from "carbon-components-svelte";
	import Navigation from "./partials/header/Header.svelte";
</script>

<Navigation />

<Content>
	<slot />
</Content>
