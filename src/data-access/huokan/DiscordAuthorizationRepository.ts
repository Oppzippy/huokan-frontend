import { DiscordAuthorizationApi } from "@huokan/huokanclient-ts";
import { BadResponseError } from "../BadResponseError";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class DiscordAuthorizationRepository {
	private readonly api: DiscordAuthorizationApi;

	public constructor() {
		this.api = new DiscordAuthorizationApi(getApiConfiguration());
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
