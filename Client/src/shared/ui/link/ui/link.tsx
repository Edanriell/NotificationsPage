import { children, type Component, JSX } from "solid-js";

import styles from "./link.module.css";

type LinkProps = {
	children: JSX.Element;
	href: string;
	linkColor: "dark-grey-blue" | "dark-grey" | "blue";
};

export const Link: Component<LinkProps> = (props) => {
	const safeChildren = children(() => props.children);

	const getLinkClass = (linkColor: string) => {
		switch (linkColor) {
			case "dark-grey-blue":
				return styles["link--color--dark-grey-blue"];
			case "dark-grey":
				return styles["link--color--dark-grey"];
			case "blue":
			default:
				return styles["link--color--blue"];
		}
	};

	return (
		<a class={styles["link"] + " " + getLinkClass(props.linkColor)} href={props.href}>
			{safeChildren()}
		</a>
	);
};
