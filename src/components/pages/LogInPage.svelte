<script lang="ts">
	import { Button } from "carbon-components-svelte";
	import Accessibility16 from "carbon-icons-svelte/lib/Accessibility16";
	import { onMount } from "svelte";
	import { unauthenticatedRepositoriesStore } from "../../stores/RepositoryStore";
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
