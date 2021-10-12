import type {
	Organization,
	UsersOrganizationsApi,
} from "@huokan/huokanclient-ts";

export class UserOrganizationsRepository {
	private api: UsersOrganizationsApi;

	public constructor(api: UsersOrganizationsApi) {
		this.api = api;
	}

	public async getOrganizationsContainingUser(
		userId: string
	): Promise<Organization[]> {
		const { organizations } = await this.api.getOrganizationsContainingUser(
			{
				userId,
			}
		);
		return organizations;
	}
}
