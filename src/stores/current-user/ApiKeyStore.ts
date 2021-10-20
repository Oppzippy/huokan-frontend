import { writable } from "svelte/store";

function createApiKeyStore(value?: string) {
	const { subscribe, set } = writable<string | null>(value);
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

export const apiKeyStore = createApiKeyStore(
	localStorage.getItem("apiKey") ?? undefined
);
