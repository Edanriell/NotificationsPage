import { RootLayout } from "@widgets/layout/root/ui";

import { type Component } from "solid-js";
import { Link } from "@shared/ui/link/ui";

import styles from "./not-found.module.css";

export const NotFoundPage: Component = () => {
	return (
		<RootLayout>
			<main class={styles.main}>
				<h1 class={styles.title}>404 - Page Not Found</h1>
				<p class={styles.description}>Oops! The page you're looking for doesn't exist.</p>
				<Link class={styles.homeLink} linkColor="blue" href="/">
					Go Back Home
				</Link>
			</main>
		</RootLayout>
	);
};
