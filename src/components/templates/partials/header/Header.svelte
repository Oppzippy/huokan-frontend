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
		HeaderPanelDivider,
	} from "carbon-components-svelte";
	import { globalPermissionStore } from "../../../../stores/current-user/GlobalPermissionStore";
	import {
		Configuration,
		DiscordAuthorizationApi,
		GlobalPermission,
	} from "@huokan/huokanclient-ts";
	import { apiKeyStore } from "../../../../stores/current-user/ApiKeyStore";
	import OrganizationSelection from "./OrganizationSelection.svelte";
	import { selectedOrganizationStore } from "../../../../stores/current-user/OrganizationsStore";

	$: isAdmin =
		$globalPermissionStore?.has(GlobalPermission.Administrator) ?? false;

	let isUtilitiesOpen: boolean;
	let isSideNavOpen: boolean;

	function refreshOrganizations() {
		const repo = new DiscordAuthorizationApi(
			new Configuration({
				basePath: "http://localhost:5001",
				headers: {
					Authorization: `Bearer ${$apiKeyStore}`,
				},
			})
		);
		repo.refreshOrganizations();
	}

	function logOut() {
		apiKeyStore.logOut();
		isUtilitiesOpen = false;
	}
</script>

<Header
	company="Huokan"
	platformName="{$selectedOrganizationStore?.name}"
	bind:isSideNavOpen
>
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
				<HeaderPanelDivider>Select Organization</HeaderPanelDivider>
				<OrganizationSelection />
				<HeaderPanelDivider>Account</HeaderPanelDivider>
				<HeaderPanelLink on:click="{refreshOrganizations}"
					>Refresh Organizations</HeaderPanelLink
				>
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
