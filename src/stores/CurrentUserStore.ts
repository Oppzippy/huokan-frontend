import type { GlobalPermission, User } from "@huokan/huokanclient-ts";
import { derived, Readable } from "svelte/store";
import {
	AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./RepositoryStore";

export const currentUserStore = derived<
	Readable<AuthenticatedRepositories | null>,
	User | null
>(authenticatedRepositoriesStore, ($authenticatedRepositoriesStore, set) => {
	if ($authenticatedRepositoriesStore != null) {
		$authenticatedRepositoriesStore.userRepository.getMe().then(set);
	} else {
		set(null);
	}
});

export const currentUserPermissionsStore = derived<
	[Readable<AuthenticatedRepositories | null>, Readable<User | null>],
	Set<GlobalPermission> | null
>(
	[authenticatedRepositoriesStore, currentUserStore],
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
