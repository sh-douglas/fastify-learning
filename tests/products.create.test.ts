import test, { mock } from "node:test";
import assert from "node:assert/strict";
import {
  createProduct,
  type ProductData,
} from "../src/modules/products/products.service.js";
import { Prisma, type Product } from "../src/generated/prisma/client.js";

test("createProduct returns the created product", async () => {
  const data = {
    name: "Monitor Gamer AOC",
    price: 1250.99,
    available: true,
  };

  const mockProduct: Product = {
    id: "83c33af3-40d5-4aff-9b07-2c344933d48d",
    name: "Monitor Gamer AOC",
    price: new Prisma.Decimal("1250.99"),
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDatabase = {
    product: {
      create: mock.fn(async (_args: { data: ProductData }) => mockProduct),
    },
  };

  const result = await createProduct(mockDatabase, data);

  assert.deepEqual(result, mockProduct);
  assert.equal(mockDatabase.product.create.mock.callCount(), 1);
  assert.deepEqual(mockDatabase.product.create.mock.calls[0]?.arguments[0], {
    data,
  });
});
