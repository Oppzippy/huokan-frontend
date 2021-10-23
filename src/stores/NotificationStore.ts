import { ResponseError } from "@huokan/huokanclient-ts";
import { writable } from "svelte/store";
import { Logger } from "../Logger";

export interface NotificationInfo {
	type: "error" | "info" | "success" | "warning";
	title: string;
	subtitle: string;
	caption: string;
	timeout?: number;
}

function createNotificationStore() {
	const { subscribe, set } = writable<NotificationInfo | undefined>();
	return {
		subscribe,
		push: set as (notificationInfo: NotificationInfo) => void,
		pushError: function (error: Error) {
			set({
				type: "error",
				title: "Error",
				subtitle: error.name,
				caption: error.message,
			});
		},
	};
}

export const notificationStore = createNotificationStore();

export function handleError(error: any) {
	if (error instanceof ResponseError) {
		notificationStore.push({
			type: "error",
			title: "API Error",
			subtitle: `${error.response.status}: ${error.response.statusText}`,
			caption: error.message,
		});
	} else if (error instanceof Error) {
		notificationStore.pushError(error);
	} else {
		Logger.error(error);
	}
}
