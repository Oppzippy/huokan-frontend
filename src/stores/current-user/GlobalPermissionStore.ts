import type { GlobalPermission, User } from "@huokan/huokanclient-ts";
import { derived, type Readable } from "svelte/store";
import {
	type AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./AuthenticatedRepositoriesStore";
import { userStore } from "./UserStore";

export const globalPermissionStore = derived<
	[Readable<AuthenticatedRepositories | null>, Readable<User | null>],
	ReadonlySet<GlobalPermission> | null
>(
	[authenticatedRepositoriesStore, userStore],
	([$authenticatedRepositoriesStore, $currentUserStore], set) => {
		if (
			$authenticatedRepositoriesStore != null &&
			$currentUserStore != null
		) {
			$authenticatedRepositoriesStore.globalPermissionRepository
				.getPermissions($currentUserStore.id)
				.then(set);
		} else {
			set(null);
		}
	}
);
