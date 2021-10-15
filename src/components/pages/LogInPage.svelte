<script lang="ts">
	import { onMount } from "svelte";
	import { unauthenticatedRepositoriesStore } from "../../stores/RepositoryStore";

	let redirectUrl: string | undefined;
	onMount(async () => {
		redirectUrl =
			await $unauthenticatedRepositoriesStore.discordAuthorizationRepository.getRedirectUrl();
	});
</script>

<div>
	<a href="{redirectUrl}">Log in with Discord</a>
</div>
