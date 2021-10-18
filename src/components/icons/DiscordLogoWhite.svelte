<script>
	// Taken from carbon-components-svelte
	let className = undefined;
	export { className as class };
	export let id = undefined;
	export let tabindex = undefined;
	export let focusable = false;
	export let title = undefined;
	export let style = undefined;

	$: ariaLabel = $$props["aria-label"];
	$: ariaLabelledBy = $$props["aria-labelledby"];
	$: labelled = ariaLabel || ariaLabelledBy || title;
	$: attributes = {
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		"aria-hidden": labelled ? undefined : true,
		role: labelled ? "img" : undefined,
		focusable: tabindex === "0" ? true : focusable,
		tabindex,
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<img
	data-carbon-icon="Calculation32"
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:keyup
	on:keydown
	class="{className}"
	style="{style}"
	id="{id}"
	alt="Discord logo"
	src="/resources/images/Discord-Logo-White.svg"
	{...attributes}
/>
