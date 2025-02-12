import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "~/lib/create-app";
import createMessageObjectSchema from "~/utils/create-message-object";
import * as HttpStatusCodes from "~/utils/http-status-codes";
import jsonContent from "~/utils/json-content";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Cars API"),
        "Cars API Index",
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Cars API",
      },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
