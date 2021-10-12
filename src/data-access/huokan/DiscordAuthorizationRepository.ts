import type { DiscordAuthorizationApi } from "@huokan/huokanclient-ts";
import { BadResponseError } from "../BadResponseError";

export class DiscordAuthorizationRepository {
	private api: DiscordAuthorizationApi;

	public constructor(api: DiscordAuthorizationApi) {
		this.api = api;
	}

	public async getRedirectUrl(): Promise<string> {
		const response = await this.api.redirectRaw({
			redirect: "manual",
		});
		const redirectUrl = response.raw.headers.get("Location");
		if (redirectUrl != null) {
			return redirectUrl;
		}
		throw new BadResponseError("Redirect url was null");
	}

	public async authorize(code: string): Promise<string> {
		const response = await this.api.authorize({
			code: code,
		});
		return response.apiKey;
	}
}
