import { readable } from "svelte/store";
import { DiscordAuthorizationRepository } from "../data-access/huokan/DiscordAuthorizationRepository";

export interface UnauthenticatedRepositores {
	discordAuthorizationRepository: DiscordAuthorizationRepository;
}

export const unauthenticatedRepositoriesStore =
	readable<UnauthenticatedRepositores>({
		discordAuthorizationRepository: new DiscordAuthorizationRepository(),
	});
