import type { Guild, GuildPartial, GuildsApi } from "@huokan/huokanclient-ts";
import type { NameAndRealmFilter } from "../NameAndRealmFilter";

export class GuildRepository {
	private api: GuildsApi;

	public constructor(api: GuildsApi) {
		this.api = api;
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
