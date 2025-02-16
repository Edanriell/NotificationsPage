export async function getResource<T>(url: string): Promise<T> {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
				// Add other custom headers here if needed
			}
		});

		if (!response.ok) {
			const errorText = await response.text();

			throw new Error(`GET request failed with status ${response.status}: ${errorText}`);
		}

		const data: T = await response.json();

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Network error occurred: ${error.message}`);
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
}
