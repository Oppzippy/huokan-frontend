import { z, type ZodFormattedError } from "zod";
import { type DataOrError, parseForm } from "./FormHelper";

const schema = z.object({
	name: z.string().min(2).max(50),
	slug: z
		.string()
		.min(2)
		.max(50)
		.regex(
			/^[A-Za-z0-9\-]+$/g,
			"Only letters, numbers, and hyphens are allowed"
		),
	discordGuildId: z.string().regex(/^[0-9]+$/g, "Should be a number"),
});

export type CreateOrganizationFormValues = {
	name: string;
	slug: string;
	discordGuildId: string;
};

export type CreateOrganizationFormErrors = {
	[key in keyof CreateOrganizationFormValues]?: ZodFormattedError<string>;
};

export function createOrganizationFormDefaultValues(): CreateOrganizationFormValues {
	return {
		name: "",
		slug: "",
		discordGuildId: "",
	};
}

export function parseCreateOrganizationForm(
	values: CreateOrganizationFormValues
): DataOrError<CreateOrganizationFormValues, CreateOrganizationFormErrors> {
	return parseForm(schema, values);
}
