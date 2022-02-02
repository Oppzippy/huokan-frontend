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
		guildId: string,
		pageLimit: number
	): Promise<Deposit[]> {
		const { deposits } = await this.api.getDeposits({
			organizationId,
			guildId,
			limit: pageLimit,
		});
		return deposits;
	}

	public async getNewerPage(
		organizationId: string,
		guildId: string,
		newestDepositIdOnCurrentPage: string,
		pageLimit: number
	): Promise<Deposit[]> {
		const { deposits } = await this.api.getDeposits({
			organizationId,
			guildId,
			after: newestDepositIdOnCurrentPage,
			limit: pageLimit,
		});
		return deposits;
	}

	public async getOlderPage(
		organizationId: string,
		guildId: string,
		oldestDepositIdOnCurrentPage: string,
		pageLimit: number
	): Promise<Deposit[]> {
		const olderPageStart = await this.api.getDeposit({
			organizationId,
			guildId,
			depositId: oldestDepositIdOnCurrentPage,
			offset: -pageLimit - 1,
		});
		const { deposits } = await this.api.getDeposits({
			organizationId,
			guildId,
			after: olderPageStart.id,
			limit: pageLimit,
		});
		return deposits;
	}
}
