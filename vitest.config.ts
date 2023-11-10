import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Use glob patterns to include specific files
		include: ["src/**/*.test.ts"],
	},
});
