import { type Component, For } from "solid-js";

import { notificationsMockData } from "../../lib/mocks";

import { Notification } from "../notification";

import styles from "./notification-list.module.css";

export const NotificationList: Component = () => {
	return (
		<ul class={styles["notification-list"]}>
			<For each={notificationsMockData}>
				{(notification) => (
					<li class={styles["notification-list__item"]}>
						<Notification notification={notification} />
					</li>
				)}
			</For>
		</ul>
	);
};
