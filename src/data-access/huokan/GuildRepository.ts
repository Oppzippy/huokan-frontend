import type { Guild, GuildPartial } from "@huokan/huokan-api-client";
import { GuildsApi } from "@huokan/huokan-api-client";
import type { NameAndRealmFilter } from "../NameAndRealmFilter";
import { getApiConfiguration } from "./HuokanClientApiFactory";

export class GuildRepository {
	private readonly api: GuildsApi;

	public constructor(apiKey: string) {
		this.api = new GuildsApi(getApiConfiguration(apiKey));
	}

	public async createGuild(
		organizationId: string,
		guildPartial: GuildPartial
	): Promise<Guild> {
		const guild = await this.api.createGuild({
			organizationId,
			guildPartial,
		});
		return guild;
	}

	public async updateGuild(
		organizationId: string,
		guildId: string,
		guildPartial: GuildPartial
	) {
		this.api.updateGuild({
			organizationId,
			guildId,
			guildPartial,
		});
	}

	public async deleteGuild(
		organizationId: string,
		guildId: string
	): Promise<void> {
		await this.api.deleteGuild({
			organizationId,
			guildId,
		});
	}

	public async getGuild(
		organizationId: string,
		guildId: string
	): Promise<Guild> {
		const guild = await this.api.getGuild({
			organizationId,
			guildId,
		});
		return guild;
	}

	public async getGuilds(
		organizationId: string,
		filter?: NameAndRealmFilter
	) {
		const { guilds } = await this.api.getGuilds({
			organizationId,
			...filter,
		});
		return guilds;
	}
}
