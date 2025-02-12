import { createRoute, z } from "@hono/zod-openapi";

import { insertCarsSchema, patchCarsSchema, selectCarsSchema } from "~/db/schema";
import { notFoundSchema } from "~/lib/constants";
import createErrorSchema from "~/utils/create-error-schema";
import * as HttpStatusCodes from "~/utils/http-status-codes";
import IdParamsSchema from "~/utils/id-params";
import jsonContent from "~/utils/json-content";
import jsonContentOneOf from "~/utils/json-content-one-of";
import jsonContentRequired from "~/utils/json-content-required";

const tags = ["Cars"];

export const list = createRoute({
  path: "/cars",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCarsSchema),
      "The list of cars",
    ),
  },
});

export const create = createRoute({
  path: "/cars",
  method: "post",
  request: {
    body: jsonContentRequired(insertCarsSchema, "The car to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectCarsSchema, "Created car"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertCarsSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/cars/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCarsSchema,
      "The requested car",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Car not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/cars/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchCarsSchema, "The car to update"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectCarsSchema, "Updated car"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Car not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchCarsSchema), (createErrorSchema(IdParamsSchema))],
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/cars/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Car deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Car not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
