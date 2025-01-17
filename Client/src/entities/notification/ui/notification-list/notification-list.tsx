import { type Component, For } from "solid-js";

import { type SingleNotification } from "../../model";

import { Notification } from "../notification";

import styles from "./notification-list.module.css";

const notificationsData: Array<SingleNotification> = [
	{
		id: "1",
		type: "reaction",
		userName: "Mark Webber",
		userAvatar: "images/raster/users/mark-webber.jpg",
		time: "2025-01-16T14:59:00Z",
		postTitle: "My first tournament today!"
	},
	{
		id: "2",
		type: "follow",
		userName: "images/raster/users/angela-gray.jpg",
		userAvatar: "angela-gray.jpg",
		time: "2025-01-16T14:55:00Z"
	},
	{
		id: "3",
		type: "group-join",
		userName: "Jacob Thompson",
		userAvatar: "images/raster/users/jacob-thompson.jpg",
		time: "2025-01-15T14:00:00Z",
		groupName: "Chess Club"
	},
	{
		id: "4",
		type: "message",
		userName: "Rizky Hasanuddin",
		userAvatar: "images/raster/users/rizky-hasanuddin.jpg",
		time: "2025-01-11T14:00:00Z",
		content:
			"Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game."
	},
	{
		id: "5",
		type: "comment",
		userName: "Kimberly Smith",
		userAvatar: "images/raster/users/kimberly-smith.jpg",
		time: "2025-01-09T14:00:00Z",
		commentImage: "comment-image.jpg"
	},
	{
		id: "6",
		type: "post-reaction",
		userName: "Nathan Peterson",
		userAvatar: "images/raster/users/nathan-peterson.jpg",
		time: "2025-01-02T14:00:00Z",
		postTitle: "5 end-game strategies to increase your win rate"
	},
	{
		id: "7",
		type: "group-leave",
		userName: "Anna Kim",
		userAvatar: "images/raster/users/anna-kim.jpg",
		time: "2025-01-01T14:00:00Z",
		groupName: "Chess Club"
	}
];

export const NotificationList: Component = () => {
	return (
		<ul class={styles["notification-list"]}>
			<For each={notificationsData}>
				{(notification) => (
					<li class={styles["notification-list__item"]}>
						<Notification notification={notification} />
					</li>
				)}
			</For>
		</ul>
	);
};
