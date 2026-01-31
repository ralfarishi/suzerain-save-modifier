import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
	],
	build: {
		outDir: "dist",
		sourcemap: false,
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					router: ["@tanstack/react-router"],
				},
			},
		},
	},
});

