import { readable, writable } from "svelte/store";
import { DiscordAuthorizationRepository } from "../data-access/huokan/DiscordAuthorizationRepository";
import type { DepositRepository } from "../data-access/huokan/DepositRepository";
import type { GuildRepository } from "../data-access/huokan/GuildRepository";
import type { OrganizationRepository } from "../data-access/huokan/OrganizationRepository";
import type { UserOrganizationsRepository } from "../data-access/huokan/UserOrganizationsRepository";
import type { UserRepository } from "../data-access/huokan/UserRepository";

export interface UnauthenticatedRepositores {
	discordAuthorizationRepository: DiscordAuthorizationRepository;
}

export interface AuthenticatedRepositories {
	depositRepository: DepositRepository;
	guildRepository: GuildRepository;
	organizationRepository: OrganizationRepository;
	userOrganizationRepository: UserOrganizationsRepository;
	userRepository: UserRepository;
}

export const unauthenticatedRepositoresStore =
	readable<UnauthenticatedRepositores>({
		discordAuthorizationRepository: new DiscordAuthorizationRepository(),
	});

// Stores should be re-created when logging in/out
export const authenticatedRepositoriesStore =
	writable<AuthenticatedRepositories>();
