import type { ZodFormattedError } from "zod";

export type DataOrError<T, E> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: E;
	  };

export function formatErrorText(
	error: ZodFormattedError<string> | undefined
): string | undefined {
	if (error != undefined) {
		return error._errors.join("\n");
	}
	return;
}
