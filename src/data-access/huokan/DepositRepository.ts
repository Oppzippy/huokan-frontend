import type { Deposit } from "@huokan/huokan-api-client";
import { DepositsApi } from "@huokan/huokan-api-client";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class DepositRepository {
	private readonly api: DepositsApi;

	public constructor(apiKey: string) {
		this.api = new DepositsApi(getApiConfiguration(apiKey));
	}

	public async getDeposits(
		organizationId: string,
		guildId: string
	): Promise<Deposit[]> {
		const { deposits } = await this.api.getDeposits({
			organizationId,
			guildId,
		});
		return deposits;
	}
}
