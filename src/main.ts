import App from "./App.svelte";
import { handleError } from "./stores/NotificationStore";

const app = new App({
	target: document.body,
});

export default app;

window.addEventListener("unhandledrejection", (event) => {
	handleError(event.reason);
});
