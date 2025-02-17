import { Component } from "solid-js";

import { Skeleton } from "@shared/ui/skeleton/ui";
import { getRandomNumber } from "@shared/lib/functions";

export const NotificationSkeleton: Component = () => {
	return (
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
	);
};
