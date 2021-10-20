<script lang="ts">
	import { selectedOrganizationStore } from "../../../stores/current-user/OrganizationsStore";

	import GuildSelection from "../../inputs/GuildSelection.svelte";
</script>

{#if $selectedOrganizationStore != null}
	<GuildSelection organizationId="{$selectedOrganizationStore?.id}" />
{/if}
