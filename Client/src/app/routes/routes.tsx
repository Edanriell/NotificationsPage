import { type Component, lazy } from "solid-js";
import { Route, Router } from "@solidjs/router";

import { NotificationsPage } from "@pages/notifications/ui";

const NotFoundPage = lazy(() => import("@pages/not-found/ui"));

export const Routes: Component = () => (
	<Router>
		<Route path="/" component={NotificationsPage} />
		<Route path="*paramName" component={NotFoundPage} />
	</Router>
);
