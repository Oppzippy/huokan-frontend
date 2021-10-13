import memoize from "lodash/memoize";

export const PermanentMemoizeDecorator = function (
	target: Object,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	if (typeof descriptor.value == "function") {
		descriptor.value = memoize(descriptor.value);
	} else {
		throw new Error(
			"Can not apply memoize decorator to something that isn't a function"
		);
	}
};
