import { Component } from "solid-js";

import { Skeleton } from "@shared/ui/skeleton/ui";
import { getRandomNumber } from "@shared/lib/functions";

import styles from "./notification-skeleton.module.css";

export const NotificationSkeleton: Component = () => {
	return (
		<div class={styles["notification-skeleton"]}>
			<Skeleton width={"45rem"} height={"45rem"} borderRadius={"50%"} />
			<div class={styles["notification-skeleton__content"]}>
				<Skeleton
					width={getRandomNumber(25, 95) + "%"}
					height={"20rem"}
					borderRadius={"8rem"}
				/>
				<Skeleton width={"80rem"} height={"20rem"} borderRadius={"8rem"} />
			</div>
		</div>
	);
};
