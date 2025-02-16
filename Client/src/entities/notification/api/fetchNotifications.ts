import { getResource } from "@shared/api";
import { env } from "@shared/config";

import { SingleNotification } from "../model";

const BASE_URL = env.VITE_API_BASE_URL;

export async function fetchNotifications(): Promise<SingleNotification[]> {
	const endpoint = `${BASE_URL}/notifications/`;

	try {
		const data = await getResource<{ notificationsData: SingleNotification[] }>(endpoint);

		return data.notificationsData;
	} catch (error) {
		throw new Error(`Failed to fetch notifications: ${(error as Error).message}`);
	}
}
