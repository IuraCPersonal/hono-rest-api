import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "~/lib/types";

import db from "~/db";
import { cars } from "~/db/schema";
import * as HttpStatusCodes from "~/utils/http-status-codes";
import * as HttpStatusPhrases from "~/utils/http-status-phrases";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "./cars.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const cars = await db.query.cars.findMany();

  return c.json(cars);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const car = c.req.valid("json");
  const [inserted] = await db.insert(cars).values(car).returning();

  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const car = await db.query.cars.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!car) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(car, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const [car] = await db.update(cars).set(
    updates,
  ).where(
    eq(cars.id, id),
  ).returning();

  if (!car) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(car, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(cars).where(
    eq(cars.id, id),
  );

  if (result.rowCount === 0) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
