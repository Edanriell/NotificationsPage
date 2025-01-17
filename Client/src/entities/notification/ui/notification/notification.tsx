import { type Component } from "solid-js";

import { formatTime } from "../../lib";
import { type SingleNotification } from "../../model";

// import styles from "./notification.module.css"

export const Notification: Component<{ notification: SingleNotification }> = ({ notification }) => {
	return (
		<article class={`notification notification-${notification.type}`}>
			<div class="notification-image">
				<img src={notification.userAvatar} alt={`${notification.userName}'s avatar`} />
			</div>
			<div class="notification-content">
				<h2 class="notification-title">
					<span class="user-name">{notification.userName}</span>{" "}
					{notification.type === "reaction" && (
						<>
							reacted to your recent post{" "}
							<span class="post-title">{notification.postTitle}</span>
						</>
					)}
					{notification.type === "follow" && <>followed you</>}
					{notification.type === "group-join" && (
						<>
							has joined your group{" "}
							<span class="group-name">{notification.groupName}</span>
						</>
					)}
					{notification.type === "message" && <>sent you a private message</>}
					{notification.type === "comment" && (
						<>
							commented{" "}
							{notification.commentImage && (
								<img
									src={notification.commentImage}
									alt="Commented on your picture"
									class="comment-image"
								/>
							)}{" "}
							on your picture
						</>
					)}
					{notification.type === "post-reaction" && (
						<>
							reacted to your recent post{" "}
							<span class="post-title">{notification.postTitle}</span>
						</>
					)}
					{notification.type === "group-leave" && (
						<>
							left the group <span class="group-name">{notification.groupName}</span>
						</>
					)}
				</h2>
				<time dateTime={notification.time}>{formatTime(notification.time)}</time>
				{notification.type === "message" && notification.content && (
					<p class="message-preview">{notification.content}</p>
				)}
			</div>
		</article>
	);
};
