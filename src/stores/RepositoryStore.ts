import { derived, Readable, readable } from "svelte/store";
import { DiscordAuthorizationRepository } from "../data-access/huokan/DiscordAuthorizationRepository";
import { DepositRepository } from "../data-access/huokan/DepositRepository";
import { GuildRepository } from "../data-access/huokan/GuildRepository";
import { OrganizationRepository } from "../data-access/huokan/OrganizationRepository";
import { UserOrganizationsRepository } from "../data-access/huokan/UserOrganizationsRepository";
import { UserRepository } from "../data-access/huokan/UserRepository";
import { apiKeyStore } from "./ApiKeyStore";
import { GlobalPermissionRepository } from "../data-access/huokan/GlobalPermissionRepository";

export interface UnauthenticatedRepositores {
	discordAuthorizationRepository: DiscordAuthorizationRepository;
}

export interface AuthenticatedRepositories {
	depositRepository: DepositRepository;
	guildRepository: GuildRepository;
	organizationRepository: OrganizationRepository;
	userOrganizationRepository: UserOrganizationsRepository;
	userRepository: UserRepository;
	globalPermissionRepository: GlobalPermissionRepository;
}

export const unauthenticatedRepositoriesStore =
	readable<UnauthenticatedRepositores>({
		discordAuthorizationRepository: new DiscordAuthorizationRepository(),
	});

// Stores should be re-created when logging in/out
export const authenticatedRepositoriesStore = derived<
	Readable<string | null>,
	AuthenticatedRepositories | null
>(apiKeyStore, ($apiKeyStore, set) => {
	if ($apiKeyStore != null) {
		set({
			depositRepository: new DepositRepository($apiKeyStore),
			guildRepository: new GuildRepository($apiKeyStore),
			organizationRepository: new OrganizationRepository($apiKeyStore),
			userOrganizationRepository: new UserOrganizationsRepository(
				$apiKeyStore
			),
			userRepository: new UserRepository($apiKeyStore),
			globalPermissionRepository: new GlobalPermissionRepository(
				$apiKeyStore
			),
		});
	} else {
		set(null);
	}
});
