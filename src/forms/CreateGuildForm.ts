import { z, type ZodFormattedError } from "zod";
import { type DataOrError, parseForm } from "./FormHelper";

const schema = z.object({
	name: z.string().min(2).max(24),
	realm: z.string().min(1).max(50),
});

export type CreateGuildFormValues = {
	name: string;
	realm: string;
};

export type CreateGuildFormErrors = {
	[key in keyof CreateGuildFormValues]?: ZodFormattedError<string>;
};

export function createGuildFormDefaultValues(): CreateGuildFormValues {
	return {
		name: "",
		realm: "",
	};
}

export function parseCreateGuildForm(
	values: CreateGuildFormValues
): DataOrError<CreateGuildFormValues, CreateGuildFormErrors> {
	return parseForm(schema, values);
}
