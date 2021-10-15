import type {
	Organization,
	OrganizationPartial,
} from "@huokan/huokanclient-ts";
import { OrganizationsApi } from "@huokan/huokanclient-ts";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class OrganizationRepository {
	private readonly api: OrganizationsApi;

	public constructor(apiKey: string) {
		this.api = new OrganizationsApi(getApiConfiguration(apiKey));
	}

	public async getOrganizations(): Promise<Organization[]> {
		const { organizations } = await this.api.getOrganizations();
		return organizations;
	}

	public async createOrganization(
		organizationPartial: OrganizationPartial
	): Promise<Organization> {
		const organization = await this.api.createOrganization({
			organizationPartial,
		});
		return organization;
	}
}
