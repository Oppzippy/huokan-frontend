import { Configuration, HTTPHeaders } from "@huokan/huokanclient-ts";

export function getApiConfiguration(apiKey?: string): Configuration {
	let headers: HTTPHeaders = {};
	if (apiKey != undefined) {
		headers["X-API-Key"] = apiKey;
	}
	return new Configuration({
		basePath: "http://127.0.0.1:5001",
		headers,
	});
}
