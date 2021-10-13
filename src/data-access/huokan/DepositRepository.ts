import type { Deposit } from "@huokan/huokanclient-ts";
import { DepositsApi } from "@huokan/huokanclient-ts";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class DepositRepository {
	private readonly api: DepositsApi;

	public constructor() {
		this.api = new DepositsApi(getApiConfiguration());
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
