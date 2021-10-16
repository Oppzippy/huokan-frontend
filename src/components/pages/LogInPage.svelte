<script lang="ts">
	import { onMount } from "svelte";
	import { unauthenticatedRepositoriesStore } from "../../stores/RepositoryStore";

	let redirectUrl: string | undefined;
	onMount(async () => {
		redirectUrl =
			await $unauthenticatedRepositoriesStore.discordAuthorizationRepository.getRedirectUrl();
	});
</script>

<div
	class="flex justify-center items-center w-screen h-screen bg-black bg-huokan-logo bg-contain bg-center bg-no-repeat"
>
	<a
		class="bg-gray-900 text-white py-1 px-3 rounded-md hover:bg-gray-600"
		href="{redirectUrl}">Log in with Discord</a
	>
</div>
