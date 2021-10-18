<script lang="ts">
	import type { Deposit } from "@huokan/huokanclient-ts";

	import { DataTable } from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../stores/current-user/OrganizationsStore";
	import GuildSelection from "../inputs/GuildSelection.svelte";

	let depositsPromise: Promise<Deposit[]> | null;
	$: if (
		$authenticatedRepositoriesStore != null &&
		$selectedOrganizationStore != null
	) {
		depositsPromise =
			$authenticatedRepositoriesStore.depositRepository.getDeposits(
				$selectedOrganizationStore.id,
				""
			);
	}
</script>

<GuildSelection />

<DataTable />
