import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../src/app.js";

test("GET /products/protected returns 401 without API key", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/products/protected",
    });

    assert.strictEqual(response.statusCode, 401);
    assert.deepStrictEqual(response.json(), { message: "Unauthorized." });
  } finally {
    await app.close();
  }
});

test("GET /products/protected returns 401 with wrong API key", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/products/protected",
      headers: {
        "x-api-key": "wrong123",
      },
    });

    assert.strictEqual(response.statusCode, 401);
    assert.deepStrictEqual(response.json(), { message: "Unauthorized." });
  } finally {
    await app.close();
  }
});

test("GET /products/protected returns 200 with API key", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/products/protected",
      headers: {
        "x-api-key": "secret123",
      },
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), { message: "Access granted." });
  } finally {
    await app.close();
  }
});

test("GET /products?category=archived return 409", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/products?category=archived",
    });

    assert.strictEqual(response.statusCode, 409);
    assert.deepStrictEqual(response.json(), {
      message: "Category is unavailable",
    });
  } finally {
    await app.close();
  }
});
