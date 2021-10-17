<script lang="ts">
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		HeaderUtilities,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderAction,
		SideNav,
		SideNavItems,
		SideNavLink,
		SideNavMenuItem,
		SideNavMenu,
	} from "carbon-components-svelte";
	import { currentUserPermissionsStore } from "../../../../stores/CurrentUserStore";
	import { GlobalPermission } from "@huokan/huokanclient-ts";
	import { apiKeyStore } from "../../../../stores/ApiKeyStore";

	$: isAdmin =
		$currentUserPermissionsStore?.has(GlobalPermission.Administrator) ??
		false;

	let isUtilitiesOpen: boolean;
	let isSideNavOpen: boolean;

	function logOut() {
		apiKeyStore.logOut();
		isUtilitiesOpen = false;
	}
</script>

<Header company="Huokan" bind:isSideNavOpen>
	<HeaderNav>
		<HeaderNavItem href="#" text="Home" />
		<HeaderNavItem href="#/deposits" text="Deposits" />
		{#if isAdmin}
			<HeaderNavMenu text="Admin">
				<HeaderNavItem
					href="#/admin/organizations"
					text="Organizations"
				/>
			</HeaderNavMenu>
		{/if}
	</HeaderNav>
	<HeaderUtilities>
		<HeaderAction bind:isOpen="{isUtilitiesOpen}">
			<HeaderPanelLinks>
				<HeaderPanelLink on:click="{logOut}">Log Out</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen="{isSideNavOpen}">
	<SideNavItems>
		<SideNavLink href="#" text="Home" />
		<SideNavLink href="#/deposits" text="Deposits" />
		{#if isAdmin}
			<SideNavMenu text="Admin">
				<SideNavMenuItem
					href="#/admin/organizations"
					text="Organizations"
				/>
			</SideNavMenu>
		{/if}
	</SideNavItems>
</SideNav>
