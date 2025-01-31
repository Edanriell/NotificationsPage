import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import type { ContextVariables } from "../constants";
import type { DBCreateNotification, DBNotification } from "../models/db";
import type { IDatabaseResource } from "../services/types";

const idSchema = z.object({
	id: z.string().min(1)
});

const notificationSchema = z.object({
	type: z.enum([
		"reaction",
		"follow",
		"group-join",
		"message",
		"comment",
		"post-reaction",
		"group-leave"
	]),
	isRead: z.boolean(),
	userName: z.string().min(1),
	userAvatar: z.string().min(1),
	time: z.string().min(1),
	content: z.string().min(1).optional(),
	postTitle: z.string().min(1).optional(),
	groupName: z.string().min(1).optional(),
	commentImage: z.string().min(1).optional()
});

export const NOTIFICATIONS_PREFIX = "/notifications/";

const NOTIFICATIONS_ROUTE = "";
const NOTIFICATIONS_FIND_ROUTE = "find/";
const NOTIFICATIONS_FIND_ALL_ROUTE = "findAll/";
const NOTIFICATIONS_GET_BY_ID_ROUTE = ":id/";
const NOTIFICATIONS_CREATE_ROUTE = "";
const NOTIFICATIONS_UPDATE_ROUTE = ":id/";
const NOTIFICATIONS_DELETE_ROUTE = ":id/";

export function createNotificationsApp(
	notificationsService: IDatabaseResource<DBNotification, DBCreateNotification>
) {
	const notificationsApp = new Hono<ContextVariables>();

	// GET /notifications - Retrieve all notifications
	notificationsApp.get(NOTIFICATIONS_ROUTE, async (context) => {
		const notificationsData = await notificationsService.findAll({});

		context.get("cache").cache({ notificationsData });
		return context.json({ notifications: notificationsData });
	});

	// GET /notifications/:id - Retrieve notification by ID
	notificationsApp.get(
		NOTIFICATIONS_GET_BY_ID_ROUTE,
		zValidator("param", idSchema),
		async (context) => {
			const { id } = context.req.valid("param");
			const notificationData = await notificationsService.get(id);

			if (!notificationData) {
				return context.json({ error: "Notification not found" }, 404);
			}

			context.get("cache").cache(notificationData);
			return context.json({ notification: notificationData });
		}
	);

	// POST /notifications/find - Find a single notification by criteria
	notificationsApp.post(
		NOTIFICATIONS_FIND_ROUTE,
		zValidator("json", notificationSchema.partial()), // Allow partial search criteria
		async (context) => {
			const searchCriteria = context.req.valid("json");
			const notificationData = await notificationsService.find(searchCriteria);

			if (!notificationData) {
				return context.json({ error: "Notification not found" }, 404);
			}

			context.get("cache").cache(notificationData);
			return context.json({ notification: notificationData });
		}
	);

	// POST /notifications/findAll - Find multiple notifications by criteria
	notificationsApp.post(
		NOTIFICATIONS_FIND_ALL_ROUTE,
		zValidator("json", notificationSchema.partial()), // Allow partial search criteria
		async (context) => {
			const searchCriteria = context.req.valid("json");
			const notificationsData = await notificationsService.findAll(searchCriteria);

			if (!notificationsData || notificationsData.length === 0) {
				return context.json({ error: "No notifications found" }, 404);
			}

			context.get("cache").cache(notificationsData);
			return context.json({ notifications: notificationsData });
		}
	);

	// POST /notifications - Create a new notification
	notificationsApp.post(
		NOTIFICATIONS_CREATE_ROUTE,
		zValidator("json", notificationSchema),
		async (context) => {
			const notificationData = context.req.valid("json");
			const createdNotification = await notificationsService.create(notificationData);

			context.get("cache").clearPath(context.req.path);
			return context.json({ notification: createdNotification }, 201);
		}
	);

	// PATCH /notifications/:id - Update an existing notification
	notificationsApp.patch(
		NOTIFICATIONS_UPDATE_ROUTE,
		zValidator("param", idSchema),
		zValidator("json", notificationSchema.partial()), // Allow partial updates
		async (context) => {
			const { id } = context.req.valid("param");
			const updateData = context.req.valid("json");

			const updatedNotification = await notificationsService.update(id, updateData);

			if (!updatedNotification) {
				return context.json({ error: "Notification not found or not updated" }, 404);
			}

			context.get("cache").clearPath(context.req.path);
			return context.json({ notification: updatedNotification });
		}
	);

	// DELETE /notifications/:id - Delete a notification
	notificationsApp.delete(
		NOTIFICATIONS_DELETE_ROUTE,
		zValidator("param", idSchema),
		async (context) => {
			const { id } = context.req.valid("param");

			const deletedNotification = await notificationsService.delete(id);

			if (!deletedNotification) {
				return context.json({ error: `Notification with ID ${id} not found` }, 404);
			}

			context.get("cache").clearPath(context.req.path);
			return context.json({ message: `Notification ${id} deleted successfully.` });
		}
	);

	return notificationsApp;
}
