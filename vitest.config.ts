import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      headless: true,
      provider: "playwright",
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: "chromium" }],
    },
  },
});
