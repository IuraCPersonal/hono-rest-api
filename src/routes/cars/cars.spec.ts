/* eslint-disable ts/ban-ts-comment */
import { describe, expectTypeOf, it } from "vitest";

import { createTestApp } from "~/lib/create-app";

import router from "./cars.index";

describe("cars list", () => {
  it("should return a list", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/cars");
    const result = await response.json();

    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });
});
