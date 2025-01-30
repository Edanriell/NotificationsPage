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
import { ChatDBResource, MessageDBResource, UserDBResource } from "./storage/orm";

import { CHAT_PREFIX, createChatApp } from "./controllers/chat";

const corsOptions = {
	origin: [Bun.env.CORS_ORIGIN as string],
	allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	allowHeaders: ["Content-Type", "Authorization"],
	maxAge: 86400
};

export function createMainApp(authApp: Hono<ContextVariables>, chatApp: Hono<ContextVariables>) {
	const app = new Hono<ContextVariables>().basePath(API_PREFIX);

	app.use("*", cors(corsOptions));
	app.use("*", timing());
	app.use("*", logger());
	app.use("*", rateLimitMiddleware);
	app.use("*", cacheMiddleware());

	app.route(CHAT_PREFIX, chatApp);
	showRoutes(app);

	return app;
}

export function createORMApp() {
	const prisma = new PrismaClient();
	prisma.$connect();
	return createMainApp(
		createAuthApp(new UserDBResource(prisma)),
		createChatApp(new ChatDBResource(prisma), new MessageDBResource(prisma))
	);
}
