import type {
	Organization,
	OrganizationPartial,
	OrganizationsApi,
} from "@huokan/huokanclient-ts";

export class OrganizationRepository {
	private api: OrganizationsApi;

	public constructor(api: OrganizationsApi) {
		this.api = api;
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
