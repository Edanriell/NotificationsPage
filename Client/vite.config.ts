import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid()],
	resolve: {
		alias: {
			"@app": fileURLToPath(new URL("./src/app", import.meta.url)),
			"@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
			"@features": fileURLToPath(new URL("./src/features", import.meta.url)),
			"@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
			"@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
			"@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url))
		}
	}
});
