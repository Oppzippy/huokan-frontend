import {
	GlobalPermission,
	GlobalUserPermissionsApi,
} from "@huokan/huokan-api-client";
import { PermanentMemoizeDecorator } from "../../decorators/MemoizeDecorator";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class GlobalPermissionRepository {
	private readonly api: GlobalUserPermissionsApi;

	public constructor(apiKey: string) {
		this.api = new GlobalUserPermissionsApi(getApiConfiguration(apiKey));
	}

	@PermanentMemoizeDecorator
	public async getPermissions(
		userId: string
	): Promise<Set<GlobalPermission>> {
		const { permissions } = await this.api.getUserPermissions({
			userId,
		});
		return permissions;
	}
}
