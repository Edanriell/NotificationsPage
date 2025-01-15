import { children, type Component, type JSX } from "solid-js";

type RootLayoutProps = {
	children: JSX.Element;
};

export const RootLayout: Component<RootLayoutProps> = (props) => {
	const safeChildren = children(() => props.children);

	return <>{safeChildren()}</>;
};
