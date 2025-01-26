import { type Component } from "solid-js";

import { Link } from "@shared/ui/link/ui";

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
						<Link linkColor="dark-grey-blue" href="#">
							{notification.userName}
						</Link>{" "}
						{notification.type === "reaction" && (
							<>
								reacted to your recent post{" "}
								<Link linkColor="dark-grey" href="#">
									{notification.postTitle}
								</Link>
							</>
						)}
						{notification.type === "follow" && <>followed you</>}
						{notification.type === "group-join" && (
							<>
								has joined your group{" "}
								<Link linkColor="blue" href="#">
									{notification.groupName}
								</Link>
							</>
						)}
						{notification.type === "message" && <>sent you a private message</>}
						{notification.type === "post-reaction" && (
							<>
								reacted to your recent post{" "}
								<Link linkColor="dark-grey" href="#">
									{notification.postTitle}
								</Link>
							</>
						)}
						{notification.type === "group-leave" && (
							<>
								left the group{" "}
								<Link linkColor="blue" href="#">
									{notification.groupName}
								</Link>
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
							<a href="#">
								<img
									src={notification.commentImage}
									alt="Commented on your picture"
									class={styles["notification__user-image-message"]}
								/>
							</a>
						)}
					</>
				)}
			</div>
		</article>
	);
};
