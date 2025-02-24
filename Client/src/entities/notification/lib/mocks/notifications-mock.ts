import type { SingleNotification } from "@entities/notification/model";

export const notificationsMockData: Array<SingleNotification> = [
	{
		id: "1",
		type: "reaction",
		isRead: false,
		userName: "Mark Webber",
		userAvatar: "images/raster/users/mark-webber.jpg",
		time: "2025-01-16T14:59:00Z",
		postTitle: "My first tournament today!"
	},
	{
		id: "2",
		type: "follow",
		isRead: false,
		userName: "Angela Gray",
		userAvatar: "images/raster/users/angela-gray.jpg",
		time: "2025-01-16T14:55:00Z"
	},
	{
		id: "3",
		type: "group-join",
		isRead: false,
		userName: "Jacob Thompson",
		userAvatar: "images/raster/users/jacob-thompson.jpg",
		time: "2025-01-15T14:00:00Z",
		groupName: "Chess Club"
	},
	{
		id: "4",
		type: "message",
		isRead: true,
		userName: "Rizky Hasanuddin",
		userAvatar: "images/raster/users/rizky-hasanuddin.jpg",
		time: "2025-01-11T14:00:00Z",
		content:
			"Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game."
	},
	{
		id: "5",
		type: "comment",
		isRead: true,
		userName: "Kimberly Smith",
		userAvatar: "images/raster/users/kimberly-smith.jpg",
		time: "2025-01-09T14:00:00Z",
		commentImage: "images/raster/comment-image.jpg"
	},
	{
		id: "6",
		type: "post-reaction",
		isRead: true,
		userName: "Nathan Peterson",
		userAvatar: "images/raster/users/nathan-peterson.jpg",
		time: "2025-01-02T14:00:00Z",
		postTitle: "5 end-game strategies to increase your win rate"
	},
	{
		id: "7",
		type: "group-leave",
		isRead: true,
		userName: "Anna Kim",
		userAvatar: "images/raster/users/anna-kim.jpg",
		time: "2025-01-01T14:00:00Z",
		groupName: "Chess Club"
	}
];
