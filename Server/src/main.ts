import { Hono } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { timing } from "hono/timing";
import { PrismaClient } from "@prisma/client";

import type { ContextVariables } from "./constants";
import { API_PREFIX } from "./constants";

import { cacheMiddleware } from "./middlewares/cacheMiddleware";
import { rateLimitMiddleware } from "./middlewares/rateLimiting";

import { createNotificationsApp, NOTIFICATIONS_PREFIX } from "./controllers/notifications";
import { NotificationsService } from "./services/notifications";

const corsOptions = {
	origin: [Bun.env.CORS_ORIGIN as string],
	allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	maxAge: 86400
};

export function createMainApp(notificationsApp: Hono<ContextVariables>) {
	const app = new Hono<ContextVariables>().basePath(API_PREFIX);

	app.use("*", cors(corsOptions));
	app.use("*", timing());
	app.use("*", logger());
	app.use("*", rateLimitMiddleware);
	app.use("*", cacheMiddleware());

	app.route(NOTIFICATIONS_PREFIX, notificationsApp);
	showRoutes(app);

	return app;
}

export function createORMApp() {
	const prisma = new PrismaClient();

	prisma
		.$connect()
		.then(() => console.log("\x1b[32m✅ Successfully connected to the database!\x1b[0m"))
		.catch(console.error);

	return createMainApp(createNotificationsApp(new NotificationsService(prisma)));
}

const PORT = 3020;
const app = createORMApp();

Bun.serve({
	port: Bun.env.PORT ? parseInt(Bun.env.PORT, 10) : 3000,
	fetch: app.fetch
});

console.log(`🚀 Server is running on http://localhost:${PORT}`);
