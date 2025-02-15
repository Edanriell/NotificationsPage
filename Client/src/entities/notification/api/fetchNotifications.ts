import { getResource } from "@shared/api";

import { SingleNotification } from "../model";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:3020/api/v1";

export async function fetchNotifications(): Promise<SingleNotification[]> {
	const endpoint = `${BASE_URL}/notifications/`;
	try {
		const data = await getResource<{ notificationsData: SingleNotification[] }>(endpoint);
		return data.notificationsData;
	} catch (error) {
		throw new Error(`Failed to fetch notifications: ${(error as Error).message}`);
	}
}
