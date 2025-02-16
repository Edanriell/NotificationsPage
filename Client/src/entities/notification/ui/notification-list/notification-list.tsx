import { type Component, createResource, For, Match, Suspense, Switch } from "solid-js";

import { fetchNotifications } from "@entities/notification/api";

import { Skeleton } from "@shared/ui/skeleton/ui";

import { SingleNotification } from "../../model";

import { Notification } from "../notification";

import styles from "./notification-list.module.css";

export const NotificationList: Component = () => {
	const [notificationsData] = createResource<SingleNotification[], Error>(fetchNotifications);

	return (
		<ul class={styles["notification-list"]}>
			<Suspense
				fallback={
					<>
						<Skeleton width={"670rem"} height={"80rem"} borderRadius={"80px"} />
					</>
				}
			>
				<Switch>
					<Match when={notificationsData.error}>
						<Skeleton width={"670rem"} height={"80rem"} borderRadius={"8rem"} />
					</Match>
					<Match when={notificationsData()}>
						<For each={notificationsData()}>
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
