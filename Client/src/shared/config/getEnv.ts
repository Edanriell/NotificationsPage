type EnvVariables = {
	VITE_API_BASE_URL: string;
};

// Helper functions to validate presence
const ensureEnvString = (value: string | undefined, name: string): string => {
	if (!value) {
		throw new Error(`Environment variable ${name} is not set.`);
	}

	return value;
};

const ensureEnvBoolean = (value: string | undefined, name: string): boolean => {
	if (!value) {
		throw new Error(`Environment variable ${name} is not set.`);
	}

	if (value.toLowerCase() === "true") return true;
	if (value.toLowerCase() === "false") return false;

	throw new Error(`Environment variable ${name} must be 'true' or 'false'.`);
};

const getEnv = (): EnvVariables => {
	const {
		VITE_API_BASE_URL
		// Destructure additional environment variables here
	} = import.meta.env;

	// Validate and assign environment variables
	return {
		VITE_API_BASE_URL: ensureEnvString(VITE_API_BASE_URL, "VITE_API_BASE_URL")
		// Validate additional environment variables here
	};
};

// Export a singleton object to prevent re-validation on each import
export const env = getEnv();
