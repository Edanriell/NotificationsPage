import { type Component, createResource, For, Match, Suspense, Switch } from "solid-js";

import { fetchNotifications } from "@entities/notification/api";

import { Skeleton } from "@shared/ui/skeleton/ui";

import { SingleNotification } from "../../model";

import { Notification } from "../notification";

import styles from "./notification-list.module.css";

function getRandomNumber(min: number = 1, max: number = 100): number {
	if (min > max) {
		throw new Error("Minimum value cannot be greater than maximum value.");
	}

	// Ensure min and max are integers
	const adjustedMin = Math.ceil(min);
	const adjustedMax = Math.floor(max);

	return Math.floor(Math.random() * (adjustedMax - adjustedMin + 1)) + adjustedMin;
}

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
						<div
							style={{
								width: "100%",
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
									"row-gap": "3rem",
									"flex-basis": "100%"
								}}
							>
								<Skeleton
									width={getRandomNumber(25, 95) + "%"}
									height={"20rem"}
									borderRadius={"8rem"}
								/>
								<Skeleton width={"80rem"} height={"20rem"} borderRadius={"8rem"} />
							</div>
						</div>
					</div>
				}
			>
				<Switch>
					<Match when={notificationsData.error}>{"Error"}</Match>
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
