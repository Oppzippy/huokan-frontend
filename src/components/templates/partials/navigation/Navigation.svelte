<script lang="ts">
	import NavigationItem from "./NavigationItem.svelte";
	import NavigationDropdown from "./NavigationDropdown.svelte";
	import { currentUserPermissionsStore } from "../../../../stores/CurrentUserStore";
	import { GlobalPermission } from "@huokan/huokanclient-ts";

	$: isAdmin =
		$currentUserPermissionsStore?.has(GlobalPermission.Administrator) ??
		false;
</script>

<ul class="flex flex-wrap flex-col md:flex-row items-stretch justify-center ">
	<li><NavigationItem href="/">Home</NavigationItem></li>
	<li><NavigationItem href="/deposits">Deposits</NavigationItem></li>

	{#if isAdmin}
		<li>
			<NavigationDropdown text="Admin">
				<NavigationItem href="/admin/organizations"
					>Organizations</NavigationItem
				>
			</NavigationDropdown>
		</li>
	{/if}
</ul>
