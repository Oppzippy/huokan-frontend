import type { User } from "@huokan/huokanclient-ts";
import { derived, Readable } from "svelte/store";
import {
	AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./AuthenticatedRepositoriesStore";

export const userStore = derived<
	Readable<AuthenticatedRepositories | null>,
	Readonly<User> | null
>(authenticatedRepositoriesStore, ($authenticatedRepositoriesStore, set) => {
	if ($authenticatedRepositoriesStore != null) {
		$authenticatedRepositoriesStore.userRepository.getMe().then(set);
	} else {
		set(null);
	}
});
