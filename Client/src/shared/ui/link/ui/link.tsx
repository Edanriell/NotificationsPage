import { children, type Component, JSX } from "solid-js";
import { A } from "@solidjs/router";

import styles from "./link.module.css";

type LinkProps = {
	children: JSX.Element;
	href: string;
	linkColor: "dark-grey-blue" | "dark-grey" | "blue";
	class?: string;
};

export const Link: Component<LinkProps> = (props) => {
	const safeChildren = children(() => props.children);
	const linkClasses = () => props.class ?? "";

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
		<A
			class={styles["link"] + " " + getLinkClass(props.linkColor) + " " + linkClasses()}
			href={props.href}
		>
			{safeChildren()}
		</A>
	);
};
