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
		OrganizationPermission,
	} from "@huokan/huokan-api-client";
	import { apiKeyStore } from "../../../../stores/current-user/ApiKeyStore";
	import OrganizationSelection from "./OrganizationSelection.svelte";
	import { selectedOrganizationStore } from "../../../../stores/current-user/OrganizationsStore";
	import { selectedOrganizationPermissionStore } from "../../../../stores/current-user/SelectedOrganizationPermissionStore";

	$: isGlobalAdmin =
		$globalPermissionStore?.has(GlobalPermission.Administrator) ?? false;
	$: isOrganizationAdmin =
		$selectedOrganizationPermissionStore?.has(
			OrganizationPermission.Administrator
		) ?? false;

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

	// Jank way of passing a scoped style to a child component
	let cursorPointer: HTMLDivElement | null | undefined;
</script>

<div class="cursor-pointer" bind:this="{cursorPointer}"></div>

<Header
	company="Huokan"
	platformName="{$selectedOrganizationStore?.name}"
	bind:isSideNavOpen
>
	<HeaderNav>
		<HeaderNavItem href="/" text="Home" />
		<HeaderNavItem href="/deposits" text="Deposits" />
		{#if isOrganizationAdmin}
			<HeaderNavMenu
				text="Organization Admin"
				href="{null}"
				class="{cursorPointer?.className}"
			>
				<HeaderNavItem
					href="/organization-admin/guilds"
					text="Guilds"
				/>
			</HeaderNavMenu>
		{/if}
		{#if isGlobalAdmin}
			<HeaderNavMenu
				text="Global Admin"
				href="{null}"
				class="{cursorPointer?.className}"
			>
				<HeaderNavItem
					href="/admin/organizations"
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
		<SideNavLink href="/" text="Home" />
		<SideNavLink href="/deposits" text="Deposits" />
		{#if isOrganizationAdmin}
			<SideNavMenu text="Organization Admin">
				<SideNavMenuItem
					href="/organization-admin/guilds"
					text="Guilds"
				/>
			</SideNavMenu>
		{/if}
		{#if isGlobalAdmin}
			<SideNavMenu text="Global Admin">
				<SideNavMenuItem
					href="/admin/organizations"
					text="Organizations"
				/>
			</SideNavMenu>
		{/if}
	</SideNavItems>
</SideNav>

<style lang="css">
	.cursor-pointer {
		cursor: pointer;
	}
</style>
