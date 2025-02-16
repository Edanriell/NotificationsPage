import { Component } from "solid-js";

import styles from "./skeleton.module.css";

interface SkeletonProps {
	width?: string;
	height?: string;
	borderRadius?: string;
}

export const Skeleton: Component<SkeletonProps> = (props) => {
	const style = {
		width: props.width || "100%",
		height: props.height || "20rem",
		"border-radius": props.borderRadius || "4rem",
		overflow: "hidden"
	};

	return <div class={styles.skeleton} style={style}></div>;
};
