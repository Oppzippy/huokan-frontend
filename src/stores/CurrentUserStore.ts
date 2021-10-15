import type { User } from "@huokan/huokanclient-ts";
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
		$authenticatedRepositoriesStore.userRepository
			.getMe()
			.then((user) => set(user));
	} else {
		set(null);
	}
});
