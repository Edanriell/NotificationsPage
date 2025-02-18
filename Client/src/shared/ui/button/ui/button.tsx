import { children, type Component, type JSX } from "solid-js";

import styles from "./button.module.css";

type ButtonProps = {
	children: JSX.Element;
	class?: string;
	isDisabled?: boolean;
};

export const Button: Component<ButtonProps> = (props) => {
	const safeChildren = children(() => props.children);
	const buttonClasses = () => props.class ?? "";
	const isButtonDisabled = () => props.isDisabled ?? false;

	return (
		<button
			class={`${styles.button} ${buttonClasses()}`}
			type="button"
			disabled={isButtonDisabled()}
		>
			{safeChildren()}
		</button>
	);
};
