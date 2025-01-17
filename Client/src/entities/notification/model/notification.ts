export type SingleNotification = {
	id: string;
	type:
		| "reaction"
		| "follow"
		| "group-join"
		| "message"
		| "comment"
		| "post-reaction"
		| "group-leave";
	isRead: boolean;
	userName: string;
	userAvatar: string;
	time: string;
	content?: string;
	postTitle?: string;
	groupName?: string;
	commentImage?: string;
};
