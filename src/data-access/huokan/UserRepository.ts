import type { User } from "@huokan/huokanclient-ts";
import { UsersApi } from "@huokan/huokanclient-ts";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class UserRepository {
	private readonly api: UsersApi;

	public constructor(apiKey: string) {
		this.api = new UsersApi(getApiConfiguration(apiKey));
	}

	public async getMe(): Promise<User> {
		const user = await this.api.getMe();
		return user;
	}

	public async getUser(userId: string): Promise<User> {
		const user = await this.api.getUser({
			userId,
		});
		return user;
	}
}
