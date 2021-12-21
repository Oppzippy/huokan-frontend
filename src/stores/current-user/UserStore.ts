import { ResponseError, type User } from "@huokan/huokanclient-ts";
import { derived, type Readable } from "svelte/store";
import { apiKeyStore } from "./ApiKeyStore";
import {
	type AuthenticatedRepositories,
	authenticatedRepositoriesStore,
} from "./AuthenticatedRepositoriesStore";

export const userStore = derived<
	Readable<AuthenticatedRepositories | null>,
	Readonly<User> | null
>(authenticatedRepositoriesStore, ($authenticatedRepositoriesStore, set) => {
	if ($authenticatedRepositoriesStore != null) {
		$authenticatedRepositoriesStore.userRepository
			.getMe()
			.then(set)
			.catch((err) => {
				if (
					err instanceof ResponseError &&
					err.response.status == 401
				) {
					apiKeyStore.logOut();
				} else {
					throw err;
				}
			});
	} else {
		set(null);
	}
});
