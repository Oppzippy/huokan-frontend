import { DiscordAuthorizationApi } from "@huokan/huokan-api-client";
import { BASE_URL } from "../../Configuration";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class DiscordAuthorizationRepository {
	private readonly api: DiscordAuthorizationApi;
	private readonly basePath: string;

	public constructor() {
		const configuration = getApiConfiguration();
		this.api = new DiscordAuthorizationApi(configuration);
		this.basePath = configuration.basePath;
	}

	public async getRedirectUrl(): Promise<string> {
		return `${this.basePath}/authorization/discord/redirect?redirectUrl=${BASE_URL}`;
	}

	public async authorize(code: string): Promise<string> {
		const response = await this.api.authorize({
			code,
			redirectUrl: BASE_URL,
		});
		return response.apiKey;
	}
}
