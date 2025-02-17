import { type Component, createResource, Match, Suspense, Switch } from "solid-js";

import { NotificationList } from "@entities/notification/ui/notification-list";
import { fetchUnreadNotifications } from "@entities/notification/api";
import { SingleNotification } from "@entities/notification/model";

import { RootLayout } from "@widgets/layout/root/ui";

import { Button } from "@shared/ui/button/ui";

import styles from "./notifications.module.css";

export const NotificationsPage: Component = () => {
	const [unreadNotifications] = createResource<SingleNotification[], Error>(
		fetchUnreadNotifications
	);

	return (
		<RootLayout>
			<main class={styles["notifications-page"]}>
				<h1 class="visually-hidden">User notifications</h1>
				<section class={styles["notifications-page__notifications-section"]}>
					<header class={styles["notifications-page__header"]}>
						<h2 class={styles["notifications-page__title"]}>
							Notifications{" "}
							<Suspense fallback={<div>Loading...</div>}>
								<Switch>
									<Match when={unreadNotifications.error}>
										<span
											class={
												styles["notifications-page__notifications-count"]
											}
										>
											Unknown
										</span>
									</Match>
									<Match when={unreadNotifications()?.length! == 0}>
										<span class="visually-hidden">
											There is no unread notifications
										</span>
									</Match>
									<Match when={unreadNotifications()?.length! > 0}>
										<span
											class={
												styles["notifications-page__notifications-count"]
											}
										>
											{unreadNotifications()?.length}
										</span>
									</Match>
								</Switch>
							</Suspense>
						</h2>
						<Button>Mark all as read</Button>
					</header>
					<NotificationList />
				</section>
			</main>
		</RootLayout>
	);
};
