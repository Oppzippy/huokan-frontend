<script lang="ts">
	import type { Organization } from "@huokan/huokanclient-ts";
	import {
		Form,
		FormGroup,
		TextInput,
		Button,
	} from "carbon-components-svelte";
	import { createEventDispatcher } from "svelte";
	import {
		createOrganizationFormDefaultValues,
		CreateOrganizationFormErrors,
		CreateOrganizationFormValues,
		parseCreateOrganizationForm,
	} from "../../forms/CreateOrganizationForm";
	import { formatErrorText } from "../../forms/FormHelper";
	import { authenticatedRepositoriesStore } from "../../stores/current-user/AuthenticatedRepositoriesStore";
	$: organizationRepository =
		$authenticatedRepositoriesStore?.organizationRepository;

	const dispatch = createEventDispatcher<{
		submitSuccees: {
			data: CreateOrganizationFormValues;
			response: Organization;
		};
		validationError: {
			error: CreateOrganizationFormErrors;
		};
	}>();

	let formValues: CreateOrganizationFormValues =
		createOrganizationFormDefaultValues();
	let formErrors: CreateOrganizationFormErrors = {};

	async function submit() {
		const result = parseCreateOrganizationForm(formValues);
		if (result.success) {
			formErrors = {};
			// TODO show error message if undefined
			if (organizationRepository != undefined) {
				const organization =
					await organizationRepository.createOrganization(
						result.data
					);
				formValues = createOrganizationFormDefaultValues();
				dispatch("submitSuccees", {
					data: result.data,
					response: organization,
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
			labelText="Organization Name"
		/>
		<TextInput
			required
			bind:value="{formValues.slug}"
			invalid="{formErrors.slug != undefined}"
			invalidText="{formatErrorText(formErrors.slug)}"
			labelText="Organization Slug"
		/>
		<TextInput
			required
			bind:value="{formValues.discordGuildId}"
			invalid="{formErrors.discordGuildId != undefined}"
			invalidText="{formatErrorText(formErrors.discordGuildId)}"
			labelText="Organization Discord ID"
			inputmode="numeric"
		/>
	</FormGroup>
	<Button type="submit">Submit</Button>
</Form>
