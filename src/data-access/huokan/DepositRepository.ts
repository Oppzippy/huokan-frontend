import type { Deposit, DepositsApi } from "@huokan/huokanclient-ts";

export class DepositRepository {
	private api: DepositsApi;

	public constructor(api: DepositsApi) {
		this.api = api;
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
