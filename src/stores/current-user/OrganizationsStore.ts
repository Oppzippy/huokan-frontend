import type { Organization, User } from "@huokan/huokanclient-ts";
import { derived, type Readable, writable } from "svelte/store";
import {
	type AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./AuthenticatedRepositoriesStore";
import { userStore } from "./UserStore";

export const organizationsStore = derived<
	[Readable<AuthenticatedRepositories | null>, Readable<User | null>],
	ReadonlyArray<Organization> | null
>(
	[authenticatedRepositoriesStore, userStore],
	([$authenticatedRepositoriesStore, $userStore], set) => {
		if ($userStore != null && $authenticatedRepositoriesStore != null) {
			$authenticatedRepositoriesStore.userOrganizationRepository
				.getOrganizationsContainingUser($userStore.id)
				.then(set);
		} else {
			set(null);
		}
	}
);

export const selectedOrganizationStore = writable<Organization | null>(null);

organizationsStore.subscribe(($organizationsStore) => {
	if ($organizationsStore != null && $organizationsStore.length >= 1) {
		selectedOrganizationStore.update(
			(selection) => selection ?? $organizationsStore[0]
		);
	} else {
		selectedOrganizationStore.set(null);
	}
});
