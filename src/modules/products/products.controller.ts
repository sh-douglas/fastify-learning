import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createProductSchema,
  productQuerySchema,
} from "../../schemas/product.schema.js";
import type { Static } from "typebox";
import {
  createProduct,
  getProductCategory,
  getProducts,
  type ProductData,
} from "./products.service.js";

type ProductQuery = Static<typeof productQuerySchema>;

export function listProducts(
  request: FastifyRequest<{ Querystring: ProductQuery }>,
) {
  const category = getProductCategory(request.query.category);

  return { category };
}

export async function listStoredProducts(request: FastifyRequest) {
  return getProducts(request.server.prisma);
}

export async function createProductController(
  request: FastifyRequest<{ Body: ProductData }>,
  reply: FastifyReply,
) {
  const product = await createProduct(request.server.prisma, request.body);

  return reply.code(201).send(product);
}
