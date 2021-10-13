import {
	GlobalPermission,
	GlobalUserPermissionsApi,
} from "@huokan/huokanclient-ts";
import { PermanentMemoizeDecorator } from "../../decorators/MemoizeDecorator";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class GlobalPermissionRepository {
	private readonly api: GlobalUserPermissionsApi;

	public constructor() {
		this.api = new GlobalUserPermissionsApi(getApiConfiguration());
	}

	@PermanentMemoizeDecorator
	public async getPermissions(
		userId: string
	): Promise<Set<GlobalPermission>> {
		const { permissions } = await this.api.getUserPermissions({
			userId: userId,
		});
		return permissions;
	}
}
