import type { Deposit } from "@huokan/huokan-api-client";
import { derived, type Readable } from "svelte/store";
import { authenticatedRepositoriesStore } from "./AuthenticatedRepositoriesStore";

export function createDepositStore(
	organizationId: string,
	guildId: string
): Readable<ReadonlyArray<Deposit>> {
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
