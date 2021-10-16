<script lang="ts">
	export let href: string | null = null;
	let classProp: string;
	export { classProp as class };
</script>

{#if href != null}
	<a href="{href}" class="{classProp}"><slot /></a>
{:else}
	<button on:click class="{classProp}"><slot /></button>
{/if}
