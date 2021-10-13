import type { User } from "@huokan/huokanclient-ts";
import { UsersApi } from "@huokan/huokanclient-ts";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class UserRepository {
	private readonly api: UsersApi;

	public constructor() {
		this.api = new UsersApi(getApiConfiguration());
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
