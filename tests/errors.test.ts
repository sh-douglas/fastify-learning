import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../src/app.js";
import AppError from "../src/shared/errors/app-error.js";

test("GET /products/:id returns 400 for invalid UUID", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/products/abc",
    });

    assert.strictEqual(response.statusCode, 400);
    assert.deepStrictEqual(response.json(), { message: "Validation error" });
  } finally {
    await app.close();
  }
});

test("GET /test/app-error returns 409 for duplicate product", async () => {
  const app = buildApp();

  app.get("/test/app-error", (request, reply) => {
    throw new AppError("Product already exists", 409);
  });

  try {
    const response = await app.inject({
      method: "GET",
      url: "/test/app-error",
    });

    assert.strictEqual(response.statusCode, 409);
    assert.deepStrictEqual(response.json(), {
      message: "Product already exists",
    });
  } finally {
    await app.close();
  }
});

test("GET /test/unexpected-error returns 500 for unexpected error", async () => {
  const app = buildApp();

  app.get("/test/unexpected-error", (request, reply) => {
    throw new Error("Database connection failed");
  });

  try {
    const response = await app.inject({
      method: "GET",
      url: "/test/unexpected-error",
    });

    assert.strictEqual(response.statusCode, 500);
    assert.deepStrictEqual(response.json(), {
      message: "Internal server error.",
    });
  } finally {
    await app.close();
  }
});
