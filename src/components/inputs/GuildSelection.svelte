<script lang="ts">
	import type { Guild } from "@huokan/huokan-api-client";

	import {
		Select,
		SelectItem,
		SelectSkeleton,
	} from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";

	export let organizationId: string;
	export let selectedGuildId: string | undefined = undefined;

	let guilds: Guild[] | null;
	function setGuilds(newGuilds: Guild[]) {
		guilds = newGuilds;
		selectedGuildId = guilds[0]?.id;
	}
	$: if ($authenticatedRepositoriesStore != null) {
		$authenticatedRepositoriesStore.guildRepository
			.getGuilds(organizationId)
			.then(setGuilds);
	}
</script>

{#if guilds == null}
	<SelectSkeleton />
{:else}
	<Select labelText="Guild" on:change bind:selected="{selectedGuildId}">
		{#each guilds as guild}
			<SelectItem
				value="{guild.id}"
				text="{`${guild.name}-${guild.realm}`}"
			/>
		{/each}
	</Select>
{/if}
