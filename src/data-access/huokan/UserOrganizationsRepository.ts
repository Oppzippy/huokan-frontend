import type { Organization } from "@huokan/huokan-api-client";
import { UserOrganizationsApi } from "@huokan/huokan-api-client";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class UserOrganizationsRepository {
	private readonly api: UserOrganizationsApi;

	public constructor(apiKey: string) {
		this.api = new UserOrganizationsApi(getApiConfiguration(apiKey));
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
