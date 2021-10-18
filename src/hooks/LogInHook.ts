import type { DiscordAuthorizationRepository } from "../data-access/huokan/DiscordAuthorizationRepository";
import { apiKeyStore } from "../stores/current-user/ApiKeyStore";

export async function checkUrlForLogIn(
	discordAuthorizationRepository: DiscordAuthorizationRepository
) {
	const urlParams = new URLSearchParams(window.location.search);
	const authCode = urlParams.get("code");
	if (authCode != null) {
		const apiKey = await discordAuthorizationRepository.authorize(authCode);
		apiKeyStore.logIn(apiKey);
	}
}
