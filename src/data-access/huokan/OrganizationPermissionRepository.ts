import { OrganizationUserPermissionsApi } from "@huokan/huokan-api-client";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class OrganizationPermissionRepository {
	private readonly api: OrganizationUserPermissionsApi;

	public constructor(apiKey: string) {
		this.api = new OrganizationUserPermissionsApi(
			getApiConfiguration(apiKey)
		);
	}

	public async getOrganizationPermissions(
		organizationId: string,
		userId: string
	) {
		const { permissions } = await this.api.getOrganizationUserPermissions({
			organizationId,
			userId,
		});
		return permissions;
	}
}
