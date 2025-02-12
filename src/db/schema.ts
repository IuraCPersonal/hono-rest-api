import * as t from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const cars = t.pgTable("cars", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar("name").notNull(),
  year: t.integer().notNull(),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t
    .timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const selectCarsSchema = createSelectSchema(cars);
export const insertCarsSchema = createInsertSchema(cars, {
  name: schema => schema.min(1),
}).omit({
  createdAt: true,
  updatedAt: true,
});

export const patchCarsSchema = insertCarsSchema.partial();
