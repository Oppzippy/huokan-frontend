<script lang="ts">
	import type { Guild } from "@huokan/huokanclient-ts";

	import {
		Select,
		SelectItem,
		SelectSkeleton,
	} from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";

	export let organizationId: string;

	let guildsPromise: Promise<Guild[]> | null;
	$: if ($authenticatedRepositoriesStore != null) {
		guildsPromise =
			$authenticatedRepositoriesStore.guildRepository.getGuilds(
				organizationId
			);
	}
</script>

{#if guildsPromise != null}
	{#await guildsPromise}
		<SelectSkeleton />
	{:then guilds}
		<Select labelText="Guild">
			{#each guilds as guild}
				<SelectItem
					value="{guild.id}"
					text="{`${guild.name}-${guild.realm}`}"
				/>
			{/each}
		</Select>
	{/await}
{:else}
	<SelectSkeleton />
{/if}
