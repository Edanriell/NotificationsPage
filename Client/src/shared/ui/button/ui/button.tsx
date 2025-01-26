import { children, type Component, type JSX } from "solid-js";

import styles from "./button.module.css";

type ButtonProps = {
	children: JSX.Element;
};

export const Button: Component<ButtonProps> = (props) => {
	const safeChildren = children(() => props.children);

	return (
		<button class={styles["button"]} type="button">
			{safeChildren()}
		</button>
	);
};
