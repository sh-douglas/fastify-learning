import type { Static } from "typebox";
import type { PrismaClient, Product } from "../../generated/prisma/client.js";
import type { createProductSchema } from "../../schemas/product.schema.js";
import AppError from "../../shared/errors/app-error.js";

interface ProductDatabase {
  product: {
    create: (args: { data: ProductData }) => Promise<Product>;
  };
}

export type ProductData = Static<typeof createProductSchema>;

export async function createProduct(
  prisma: ProductDatabase,
  data: ProductData,
) {
  return prisma.product.create({
    data,
  });
}

export function getProductCategory(category?: string) {
  if (category === "archived") {
    throw new AppError("Category is unavailable", 409);
  }

  return category ?? "all";
}

export async function getProducts(prisma: PrismaClient) {
  return prisma.product.findMany();
}
