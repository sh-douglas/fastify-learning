import test from "node:test";
import assert from "node:assert/strict";
import { getProductCategory } from "../src/modules/products/products.service.js";
import AppError from "../src/shared/errors/app-error.js";

test("getProductCategory returns the provided category", () => {
  const response = getProductCategory("drinks");

  assert.strictEqual(response, "drinks");
});

test("getProductCategory returns fallback", () => {
  const response = getProductCategory();

  assert.strictEqual(response, "all");
});

test("getProductCategory return error when category is archived", () => {
  assert.throws(
    () => {
      getProductCategory("archived");
    },
    (error) => {
      assert.ok(error instanceof AppError);
      assert.strictEqual(error.message, "Category is unavailable");
      assert.strictEqual(error.statusCode, 409);

      return true;
    },
  );
});
