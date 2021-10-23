<script lang="ts">
	import { ToastNotification } from "carbon-components-svelte";
	import { onMount } from "svelte";
	import {
		NotificationInfo,
		notificationStore,
	} from "../../stores/NotificationStore";

	onMount(() => {
		const unsubscribe = notificationStore.subscribe((notificationInfo) => {
			if (notificationInfo != undefined) {
				notifications = [...notifications, notificationInfo];
			}
		});

		return unsubscribe;
	});

	let notifications: NotificationInfo[] = [];

	function onClose(closedNotification: NotificationInfo) {
		notifications = notifications.filter(
			(notification) => notification != closedNotification
		);
	}
</script>

<div class="toast-container">
	{#each notifications as notification}
		<ToastNotification
			kind="{notification.type}"
			title="{notification.title}"
			subtitle="{notification.subtitle}"
			caption="{notification.caption}"
			timeout="{notification.timeout}"
			on:close="{() => onClose(notification)}"
		/>
	{/each}
</div>

<style lang="scss">
	.toast-container {
		display: flex;
		flex-direction: column;

		position: fixed;
		bottom: 0;
		right: 0;
		margin-right: 1.5rem;
		margin-bottom: 1.5rem;
	}
</style>
