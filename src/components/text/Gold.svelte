<script lang="ts">
	export let amount: number;

	const copper = amount % 100;
	const silver = Math.floor(amount / 100) % 100;
	const gold = Math.floor(amount / 10000);
</script>

{#if gold != 0}
	{gold.toLocaleString()}g
{/if}
{#if silver != 0}
	{silver.toLocaleString()}s
{/if}
{#if copper != 0 || amount == 0}
	{copper.toLocaleString()}c
{/if}
