export type DBEntity = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
};

type NotificationType =
	| "reaction"
	| "follow"
	| "group-join"
	| "message"
	| "comment"
	| "post-reaction"
	| "group-leave";

export type DBNotification = DBEntity & {
	type: NotificationType;
	isRead: boolean;
	userName: string;
	userAvatar: string;
	time: string;
	content?: string;
	postTitle?: string;
	groupName?: string;
	commentImage?: string;
};

export type DBGetNotification = Pick<DBNotification, "id">;
export type DBCreateNotification = Omit<DBNotification, "id" | "createdAt" | "updatedAt">;
export type DBUpdateNotification = Partial<DBNotification>;
export type DBDeleteNotification = Pick<DBNotification, "id">;
