import { postResource } from "@shared/api";
import { env } from "@shared/config";

import { SingleNotification } from "../model";

const BASE_URL = env.VITE_API_BASE_URL;

export async function fetchUnreadNotifications(): Promise<SingleNotification[]> {
	const endpoint = `${BASE_URL}/notifications/findAll/`;

	try {
		const data = await postResource<{
			notifications: SingleNotification[];
		}>(endpoint, {
			isRead: false
		});

		return data.notifications;
	} catch (error) {
		throw new Error(`Failed to fetch notifications: ${(error as Error).message}`);
	}
}
