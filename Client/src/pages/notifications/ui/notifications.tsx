import { type Component } from "solid-js";

import { RootLayout } from "@widgets/layout/root/ui";

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
						<button class={styles["button"]} type="button">
							Mark all as read
						</button>
					</header>
				</section>
			</main>
		</RootLayout>
	);
};
