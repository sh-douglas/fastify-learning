import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../src/app.js";

test("GET /health should return 200", async () => {
  const app = buildApp();

  try {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), { status: "ok" });
  } finally {
    await app.close();
  }
});
