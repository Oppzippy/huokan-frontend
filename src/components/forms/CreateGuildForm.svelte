<script lang="ts">
	import type { Guild } from "@huokan/huokanclient-ts";

	import {
		Button,
		Form,
		FormGroup,
		TextInput,
	} from "carbon-components-svelte";
	import { createEventDispatcher } from "svelte";
	import {
		createGuildFormDefaultValues,
		type CreateGuildFormErrors,
		type CreateGuildFormValues,
		parseCreateGuildForm,
	} from "../../forms/CreateGuildForm";
	import { formatErrorText } from "../../forms/FormHelper";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	import { selectedOrganizationStore } from "../../stores/current-user/OrganizationsStore";
	$: guildRepository = $authenticatedRepositoriesStore?.guildRepository;

	const dispatch = createEventDispatcher<{
		submitSuccees: {
			data: CreateGuildFormValues;
			response: Guild;
		};
		validationError: {
			error: CreateGuildFormErrors;
		};
	}>();

	let formValues = createGuildFormDefaultValues();
	let formErrors: CreateGuildFormErrors = {};

	async function submit() {
		const result = parseCreateGuildForm(formValues);
		if (result.success) {
			// TODO show error if undefined
			if (
				$selectedOrganizationStore != undefined &&
				guildRepository != undefined
			) {
				const guild = await guildRepository.createGuild(
					$selectedOrganizationStore.id,
					result.data
				);
				formValues = createGuildFormDefaultValues();
				dispatch("submitSuccees", {
					data: result.data,
					response: guild,
				});
			}
		} else {
			formErrors = result.error;
			dispatch("validationError", { error: formErrors });
		}
	}
</script>

<Form on:submit="{submit}">
	<FormGroup>
		<TextInput
			required
			bind:value="{formValues.name}"
			invalid="{formErrors.name != undefined}"
			invalidText="{formatErrorText(formErrors.name)}"
			labelText="Guild Name"
		/>
		<TextInput
			required
			bind:value="{formValues.realm}"
			invalid="{formErrors.realm != undefined}"
			invalidText="{formatErrorText(formErrors.realm)}"
			labelText="Guild Realm"
		/>
	</FormGroup>
	<Button type="submit">Submit</Button>
</Form>
