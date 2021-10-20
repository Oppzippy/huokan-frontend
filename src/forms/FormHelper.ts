import type {
	objectInputType,
	objectOutputType,
	ZodFormattedError,
	ZodObject,
	ZodRawShape,
	ZodTypeAny,
} from "zod";

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

export function parseForm<T extends ZodRawShape>(
	schema: ZodObject<
		T,
		"strip",
		ZodTypeAny,
		objectOutputType<T, ZodTypeAny>,
		objectInputType<T, ZodTypeAny>
	>,
	values: objectInputType<T, ZodTypeAny>
): DataOrError<
	objectOutputType<T, ZodTypeAny>,
	ZodFormattedError<objectInputType<T, ZodTypeAny>>
> {
	const result = schema.safeParse(values);
	if (result.success) {
		return result;
	} else {
		return {
			success: false,
			error: result.error.format(),
		};
	}
}
