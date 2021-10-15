import type { Deposit } from "@huokan/huokanclient-ts";
import { derived, Readable, readable } from "svelte/store";
import { authenticatedRepositoriesStore } from "./RepositoryStore";

export function createDepositStore(
	organizationId: string,
	guildId: string
): Readable<Deposit[]> {
	return derived(
		authenticatedRepositoriesStore,
		($authenticatedRepositoriesStore, set) => {
			if ($authenticatedRepositoriesStore == null) {
				return;
			}
			const interval = setInterval(async () => {
				const deposits =
					await $authenticatedRepositoriesStore.depositRepository.getDeposits(
						organizationId,
						guildId
					);
				set(deposits);
			}, 10000);
			return () => clearInterval(interval);
		}
	);
}
