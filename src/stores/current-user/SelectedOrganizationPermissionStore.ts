import type {
	Organization,
	OrganizationPermission,
	User,
} from "@huokan/huokanclient-ts";
import { derived, Readable } from "svelte/store";
import {
	AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./AuthenticatedRepositoriesStore";
import { selectedOrganizationStore } from "./OrganizationsStore";
import { userStore } from "./UserStore";

export const selectedOrganizationPermissionStore = derived<
	[
		Readable<AuthenticatedRepositories | null>,
		Readable<User | null>,
		Readable<Organization | null>
	],
	Set<OrganizationPermission> | null
>(
	[authenticatedRepositoriesStore, userStore, selectedOrganizationStore],
	(
		[
			$authenticatedRepositoriesStore,
			$userStore,
			$selectedOrganizationStore,
		],
		set
	) => {
		if (
			$selectedOrganizationStore != null &&
			$userStore != null &&
			$authenticatedRepositoriesStore != null
		) {
			$authenticatedRepositoriesStore.organizationPermissionRepository
				.getOrganizationPermissions(
					$selectedOrganizationStore.id,
					$userStore.id
				)
				.then(set);
		} else {
			set(null);
		}
	}
);
