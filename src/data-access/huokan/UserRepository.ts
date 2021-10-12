import type { User, UsersApi } from "@huokan/huokanclient-ts";

export class UserRepository {
	private api: UsersApi;

	public constructor(api: UsersApi) {
		this.api = api;
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
