import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import type { ContextVariables } from "../constants";
import type { DBCreateNotification, DBNotification } from "../models/db";
import type { IDatabaseResource } from "../storage/types";

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
const NOTIFICATIONS_FIND_ROUTE = ":id/";
const NOTIFICATIONS_CREATE_ROUTE = "";
const NOTIFICATIONS_UPDATE_ROUTE = ":id/";
const NOTIFICATIONS_DELETE_ROUTE = ":id/";

export function createNotificationsApp(
	notificationsService: IDatabaseResource<DBNotification, DBCreateNotification>
) {
	const notificationsApp = new Hono<ContextVariables>();

	notificationsApp.get(NOTIFICATIONS_ROUTE, async (context) => {
		const notificationsData = await notificationsService.findAll();
		const res = { notificationsData };
		context.get("cache").cache(res);
		return context.json({ notificationsData });
	});

	notificationsApp.get(
		NOTIFICATIONS_FIND_ROUTE,
		zValidator("param", idSchema),
		async (context) => {
			const { id } = context.req.valid("param");
			const notificationData = await notificationsService.find({ id });
			const res = { notificationData };
			context.get("cache").cache(res);
			return context.json({ notificationData });
		}
	);

	notificationsApp.post(
		NOTIFICATIONS_CREATE_ROUTE,
		zValidator("json", notificationSchema),
		async (context) => {
			const {
				type,
				isRead,
				userName,
				userAvatar,
				time,
				content,
				postTitle,
				groupName,
				commentImage
			} = context.req.valid("json");
			const createdNotificationData = await notificationsService.create({
				type,
				isRead,
				userName,
				userAvatar,
				time,
				content,
				postTitle,
				groupName,
				commentImage
			});
			console.log(context.req.path);
			context.get("cache").clearPath(context.req.path);
			return context.json({ createdNotificationData });
		}
	);

	notificationsApp.patch(
		NOTIFICATIONS_UPDATE_ROUTE,
		zValidator("param", idSchema),
		zValidator("json", notificationSchema.partial()), // Allow partial updates
		async (context) => {
			const { id } = context.req.valid("param");
			const updatedData = context.req.valid("json"); // Cleaned, validated updated data

			// Perform update directly with `id` and updated fields
			const updatedNotificationData = await notificationsService.update({
				id,
				...updatedData
			});

			console.log(`Notification with ID ${id} updated.`);
			context.get("cache").clearPath(context.req.path); // Clear cache for this path
			return context.json({ updatedNotificationData });
		}
	);

	notificationsApp.delete(
		NOTIFICATIONS_DELETE_ROUTE,
		zValidator("param", idSchema),
		async (context) => {
			const { id } = context.req.valid("param"); // Extract the notification ID

			// Perform deletion
			await notificationsService.delete({ id });

			console.log(`Notification with ID ${id} deleted.`);
			context.get("cache").clearPath(context.req.path); // Clear cache for this path
			return context.json({ message: `Notification ${id} deleted successfully.` });
		}
	);

	return notificationsApp;
}
