import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: "**.js",
    globals: true,
    setupFiles: "../../vitest.setup.mjs",
    browser: {
      headless: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }],
    },
  },
});
