import { type Component, For } from "solid-js";

import { Notification } from "@entities/notification/ui";

import { RootLayout } from "@widgets/layout/root/ui";

import styles from "./notifications.module.css";

const notificationsData = [
	{
		id: "1",
		type: "reaction",
		userName: "Mark Webber",
		userAvatar: "mark-webber.jpg",
		time: "2025-01-16T14:59:00Z",
		postTitle: "My first tournament today!"
	},
	{
		id: "2",
		type: "follow",
		userName: "Angela Gray",
		userAvatar: "angela-gray.jpg",
		time: "2025-01-16T14:55:00Z"
	},
	{
		id: "3",
		type: "group-join",
		userName: "Jacob Thompson",
		userAvatar: "jacob-thompson.jpg",
		time: "2025-01-15T14:00:00Z",
		groupName: "Chess Club"
	},
	{
		id: "4",
		type: "message",
		userName: "Rizky Hasanuddin",
		userAvatar: "rizky-hasanuddin.jpg",
		time: "2025-01-11T14:00:00Z",
		content:
			"Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game."
	},
	{
		id: "5",
		type: "comment",
		userName: "Kimberly Smith",
		userAvatar: "kimberly-smith.jpg",
		time: "2025-01-09T14:00:00Z",
		commentImage: "comment-image.jpg"
	},
	{
		id: "6",
		type: "post-reaction",
		userName: "Nathan Peterson",
		userAvatar: "nathan-peterson.jpg",
		time: "2025-01-02T14:00:00Z",
		postTitle: "5 end-game strategies to increase your win rate"
	},
	{
		id: "7",
		type: "group-leave",
		userName: "Anna Kim",
		userAvatar: "anna-kim.jpg",
		time: "2025-01-01T14:00:00Z",
		groupName: "Chess Club"
	}
];

export const NotificationsPage: Component = () => {
	return (
		<RootLayout>
			<main class={styles["notifications-page"]}>
				<h1 class="visually-hidden">User notifications</h1>
				<section class={styles["notifications-page__notifications-section"]}>
					<header class={styles["notifications-page__header"]}>
						<h2 class={styles["notifications-page__title"]}>
							Notifications{" "}
							<span class={styles["notifications-page__notifications-count"]}>3</span>
						</h2>
						<button class={styles["button"]} type="button">
							Mark all as read
						</button>
					</header>
					<ul>
						<For each={notificationsData}>
							{(notification) => <Notification notification={notification} />}
						</For>
					</ul>
				</section>
			</main>
		</RootLayout>
	);
};

// TODO
// NotificationList Entity
// Separate Notification
