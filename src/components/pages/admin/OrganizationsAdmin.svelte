<script lang="ts">
	import {
		Form,
		FormGroup,
		TextInput,
		Button,
		InlineLoading,
		UnorderedList,
		ListItem,
		NumberInput,
	} from "carbon-components-svelte";
	import { authenticatedRepositoriesStore } from "../../../stores/RepositoryStore";
	$: organizationRepository =
		$authenticatedRepositoriesStore?.organizationRepository;
	$: organizationsPromise = organizationRepository?.getOrganizations();

	interface FormValues {
		name: string;
		slug: string;
		discordGuildId: number;
	}

	const formValues: FormValues = {
		discordGuildId: 0,
		name: "",
		slug: "",
	};

	async function submit() {
		await organizationRepository?.createOrganization({
			...formValues,
		});
		organizationsPromise = organizationRepository?.getOrganizations();
	}
</script>

<h3>Add Organization</h3>
<Form on:submit="{submit}">
	<FormGroup>
		<TextInput
			bind:value="{formValues.name}"
			required
			labelText="Organization Name"
		/>
		<TextInput
			bind:value="{formValues.slug}"
			required
			pattern="[a-z0-9\-]+"
			labelText="Organization Slug"
		/>
		<NumberInput
			bind:value="{formValues.discordGuildId}"
			required
			hideSteppers
			label="Organization Discord ID"
		/>
	</FormGroup>
	<Button type="submit">Submit</Button>
</Form>

<h3>Organizations</h3>

{#if organizationsPromise != undefined}
	{#await organizationsPromise}
		<InlineLoading />
	{:then organizations}
		<UnorderedList>
			{#each organizations as organization}
				<ListItem>{organization.name}</ListItem>
			{/each}
		</UnorderedList>
	{/await}
{:else}
	You are not logged in.
{/if}
