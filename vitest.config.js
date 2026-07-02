import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // use jsdom environment for testing
    globals: true, // use global variables like describe, it, expect without importing them
    setupFiles: "./setupTests.js", // run the setuptest file
  },
});
