/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            reporter: ["text", "clover"],
            all: true,
            exclude: [
                "tests",
                "dist",
                "coverage/**",
                "src/*.test.js",
                "**/*.d.ts",
                "*.config.*",
                "**/{ava,babel,nyc}.config.{js,cjs,mjs}",
                "**/jest.config.{js,cjs,mjs,ts}",
                "**/{karma,rollup,webpack}.config.js",
                "**/.{eslint,mocha}rc.{js,cjs}",
            ],
        },
    },
});
