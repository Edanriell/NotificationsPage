import { type Component } from "solid-js";

import { NotificationList } from "@entities/notification/ui/notification-list";

import { RootLayout } from "@widgets/layout/root/ui";

import { Button } from "@shared/ui/button/ui";

import styles from "./notifications.module.css";

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
						<Button>Mark all as read</Button>
					</header>
					<NotificationList />
				</section>
			</main>
		</RootLayout>
	);
};
