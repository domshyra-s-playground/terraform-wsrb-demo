import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const defaultConfigStuff = {
	plugins: [react(), tsconfigPaths()],
	define: {
		global: "window",
	},
};

/// <reference types="vitest/config" />
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	if (command === "serve") {
		return {
			...defaultConfigStuff,
			server: {
				port: 3000,
				https: {
					key: fs.readFileSync(".cert/key.pem"),
					cert: fs.readFileSync(".cert/cert.pem"),
				},
			},
			// dev specific config
		};
	}
	// command === 'build'
	return {
		...defaultConfigStuff,
		build: {
			rollupOptions: {},
		},
	};
});
