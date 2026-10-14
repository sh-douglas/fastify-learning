import type { FastifyRequest } from "fastify";
import { productQuerySchema } from "../../schemas/product.schema.js";
import type { Static } from "typebox";
import { getProductCategory } from "./products.service.js";

type ProductQuery = Static<typeof productQuerySchema>;

export function listProducts(
  request: FastifyRequest<{ Querystring: ProductQuery }>,
) {
  const category = getProductCategory(request.query.category);

  return { category };
}
