import type { Deposit } from "@huokan/huokanclient-ts";
import { readable } from "svelte/store";

export const deposits = readable<Deposit[] | null>(null, (set) => {
	const interval = setInterval(() => {}, 10000);
	return () => clearInterval(interval);
});
