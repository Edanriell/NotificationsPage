import { type Component, createResource, For, Match, Suspense, Switch } from "solid-js";

import { fetchNotifications } from "@entities/notification/api";

import { SingleNotification } from "../../model";

import { Notification } from "../notification";
import { NotificationSkeleton } from "../notification-skeleton";

import styles from "./notification-list.module.css";

export const NotificationList: Component = () => {
	const [notifications] = createResource<SingleNotification[], Error>(fetchNotifications);

	return (
		<ul class={styles["notification-list"]}>
			<Suspense
				fallback={
					<div class={styles["notification-list__fallback"]}>
						<NotificationSkeleton />
						<NotificationSkeleton />
						<NotificationSkeleton />
						<NotificationSkeleton />
						<NotificationSkeleton />
						<NotificationSkeleton />
						<NotificationSkeleton />
					</div>
				}
			>
				<Switch>
					<Match when={notifications.error}>
						<div
							class={
								styles["notification-list__error-message"] +
								" " +
								styles["error-message"]
							}
						>
							<p class={styles["error-message__text"]}>
								Error: {notifications.error.message}
							</p>
						</div>
					</Match>
					<Match when={notifications()}>
						<For each={notifications()}>
							{(notification) => (
								<li class={styles["notification-list__item"]}>
									<Notification notification={notification} />
								</li>
							)}
						</For>
					</Match>
				</Switch>
			</Suspense>
		</ul>
	);
};
