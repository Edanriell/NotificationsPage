import { type Component } from "solid-js";

import { formatTime } from "../../lib";
import { type SingleNotification } from "../../model";

import styles from "./notification.module.css";

export const Notification: Component<{ notification: SingleNotification }> = ({ notification }) => {
	return (
		<article
			class={
				notification.isRead
					? styles["notification"] + " " + styles["notification--type--read"]
					: styles["notification"] + " " + styles["notification--type--unread"]
			}
		>
			<div class={styles["notification__user-image-wrapper"]}>
				<img
					class={styles["notification__user-image"]}
					src={notification.userAvatar}
					alt={`${notification.userName}'s avatar`}
				/>
			</div>
			<div class={styles["notification__content-wrapper"]}>
				<div class={styles["notification__content"]}>
					<h2 class={styles["notification__title"]}>
						<a class={styles["notification__user-name"]} href="#">
							<span>{notification.userName}</span>
						</a>{" "}
						{notification.type === "reaction" && (
							<>
								reacted to your recent post{" "}
								<a class={styles["notification__post-title"]} href="#">
									<span>{notification.postTitle}</span>
								</a>
							</>
						)}
						{notification.type === "follow" && <>followed you</>}
						{notification.type === "group-join" && (
							<>
								has joined your group{" "}
								<a class={styles["notification__group-name"]} href="#">
									<span>{notification.groupName}</span>
								</a>
							</>
						)}
						{notification.type === "message" && <>sent you a private message</>}
						{notification.type === "post-reaction" && (
							<>
								reacted to your recent post{" "}
								<a class={styles["notification__post-title"]} href="#">
									<span>{notification.postTitle}</span>
								</a>
							</>
						)}
						{notification.type === "group-leave" && (
							<>
								left the group{" "}
								<a class={styles["notification__group-name"]} href="#">
									<span>{notification.groupName}</span>
								</a>
							</>
						)}
						{notification.type === "comment" && <>commented on your picture</>}
						{!notification.isRead && (
							<span class={styles["notification__red-dot"]}></span>
						)}
					</h2>
					<time class={styles["notification__time"]} dateTime={notification.time}>
						{formatTime(notification.time)}
					</time>
					{notification.type === "message" && notification.content && (
						<p class={styles["notification__user-message-preview"]}>
							{notification.content}
						</p>
					)}
				</div>
				{notification.type === "comment" && (
					<>
						{notification.commentImage && (
							<img
								src={notification.commentImage}
								alt="Commented on your picture"
								class={styles["notification__user-image-message"]}
							/>
						)}
					</>
				)}
			</div>
		</article>
	);
};
