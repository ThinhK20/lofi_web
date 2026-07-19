import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, transformWithOxc } from "vite";

const transformJsxInJs = {
    name: "transform-jsx-in-js",
    enforce: "pre",
    async transform(code, id) {
        if (!id.includes("/src/") || !id.endsWith(".js")) return null;

        return transformWithOxc(code, id, {
            lang: "jsx",
            jsx: {
                runtime: "automatic",
            },
        });
    },
};

export default defineConfig({
    plugins: [transformJsxInJs, react()],
    resolve: {
        alias: {
            "~": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        exclude: ["e2e/**", "node_modules/**"],
        coverage: {
            provider: "v8",
            include: ["src/data/mediaCatalog.js", "src/pages/Home/HomeBackground/**"],
            thresholds: {
                lines: 80,
                functions: 80,
                statements: 80,
                branches: 80,
            },
        },
    },
});
