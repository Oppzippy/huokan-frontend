import { writable } from "svelte/store";

function createApiKeyStore() {
	const { subscribe, set } = writable<string | null>(
		localStorage.getItem("apiKey")
	);
	return {
		subscribe,
		logIn: function (apiKey: string) {
			localStorage.setItem("apiKey", apiKey);
			set(apiKey);
		},
		logOut: function () {
			localStorage.removeItem("apiKey");
			set(null);
		},
	};
}

export const apiKeyStore = createApiKeyStore();
