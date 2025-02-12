import { pinoLogger } from "hono-pino";

import env from "~/env";

export function logger() {
  return pinoLogger({
    pino: {
      level: env.LOG_LEVEL || "info",
      transport: {
        target:
          env.NODE_ENV === "production" ? "" : "pino-pretty",
        options: {
          colorize: true,
        },
      },
    },
  });
}
