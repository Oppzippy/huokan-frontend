import { z, ZodFormattedError } from "zod";
import { DataOrError, parseForm } from "./FormHelper";

const schema = z.object({
	name: z.string().min(1),
	realm: z.string().min(1),
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
