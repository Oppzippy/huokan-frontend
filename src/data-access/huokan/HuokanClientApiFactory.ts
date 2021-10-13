import { Configuration } from "@huokan/huokanclient-ts";

export function getApiConfiguration(): Configuration {
	return new Configuration({
		apiKey: getApiKey() ?? undefined,
	});
}

function getApiKey(): string | null {
	return localStorage.getItem("apiKey");
}
