<script lang="ts">
	import { Button } from "carbon-components-svelte";
	import { onMount } from "svelte";
	import { unauthenticatedRepositoriesStore } from "../../stores/UnauthenticatedRepositoriesStore";
	import DiscordLogoWhite from "../icons/DiscordLogoWhite.svelte";

	let redirectUrl: string | undefined;
	onMount(async () => {
		redirectUrl =
			await $unauthenticatedRepositoriesStore.discordAuthorizationRepository.getRedirectUrl();
	});
</script>

<Button href="{redirectUrl}" icon="{DiscordLogoWhite}">
	<span>Log in with Discord</span>
</Button>
