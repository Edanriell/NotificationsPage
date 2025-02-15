export async function fetchNotifications() {
	try {
		const response = await fetch("http://localhost:3020/api/v1/notifications/");

		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = await response.json(); // Parse the JSON response

		return data.notificationsData;
	} catch (error) {
		throw new Error(`Network error occurred: ${error.message}`);
	}
}
