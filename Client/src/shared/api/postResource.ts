export async function postResource<T>(url: string, body: any): Promise<T> {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
				// Add other custom headers here if needed
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			const errorText = await response.text();

			throw new Error(`POST request failed with status ${response.status}: ${errorText}`);
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
