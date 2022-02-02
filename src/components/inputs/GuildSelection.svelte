<script lang="ts">
	import type { Guild } from "@huokan/huokan-api-client";

	import { ComboBox, SelectSkeleton } from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";

	export let organizationId: string;
	export let selectedGuildId: string | undefined = undefined;

	let guilds: Guild[] | null;
	$: if ($authenticatedRepositoriesStore != null) {
		$authenticatedRepositoriesStore.guildRepository
			.getGuilds(organizationId)
			.then((newGuilds) => (guilds = newGuilds));
	} else {
		guilds = null;
	}
</script>

{#if guilds == null}
	<SelectSkeleton />
{:else}
	<ComboBox
		titleText="Guild"
		placeholder="Select guild bank to view"
		on:select
		bind:selectedId="{selectedGuildId}"
		items="{guilds.map((guild) => ({
			id: guild.id,
			text: `${guild.name}-${guild.realm}`,
		}))}"
	/>
{/if}
