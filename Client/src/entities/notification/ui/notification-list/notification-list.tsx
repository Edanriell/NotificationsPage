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
					<div
						style={{
							width: "100%",
							display: "flex",
							"flex-direction": "column",
							"row-gap": "8rem"
						}}
					>
						<Skeleton width={"670rem"} height={"80rem"} borderRadius={"8rem"} />
					</div>
				}
			>
				<Switch>
					<Match when={notificationsData.error}>
						<div
							style={{
								width: "670rem",
								height: "80rem",
								"border-radius": "8rem",
								"background-color": "#f7fafd",
								padding: "18rem 20rem 17rem 20rem",
								display: "flex",
								"flex-direction": "row",
								"column-gap": "19rem",
								"align-items": "center"
							}}
						>
							<Skeleton width={"45rem"} height={"45rem"} borderRadius={"50%"} />
							<div
								style={{
									display: "flex",
									"flex-direction": "column",
									"row-gap": "3rem"
								}}
							>
								<Skeleton width={"350rem"} height={"20rem"} borderRadius={"8rem"} />
								<Skeleton width={"80rem"} height={"20rem"} borderRadius={"8rem"} />
							</div>
						</div>
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
