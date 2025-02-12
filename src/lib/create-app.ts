import { OpenAPIHono } from "@hono/zod-openapi";

import { logger } from "~/middlewares/pino-logger";
import defaultHook from "~/utils/default-hook";

import type { AppBindings, AppOpenAPI } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createRouter();
  app.use(logger());

  return app;
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp();
  testApp.route("/", router);

  return testApp;
}
