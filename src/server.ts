import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
} from "./schemas/product.schema.js";

const app = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.get(
  "/products/:id",
  {
    schema: {
      params: productParamsSchema,
    },
  },
  (request, reply) => {
    const { id } = request.params;
    return reply.code(200).send({ productId: id });
  },
);

app.post("/products", {
  schema: {
    body: createProductSchema,
  },
  handler(request, reply) {
    const { name, price, available } = request.body;

    return reply.code(201).send({
      product: {
        name,
        price,
        available,
      },
    });
  },
});

app.get(
  "/products",
  {
    schema: {
      querystring: productQuerySchema,
    },
  },
  (request, reply) => {
    const { category } = request.query;

    return reply.code(200).send({ category: category ?? "all" });
  },
);

app.get("/health", (request, reply) => {
  return reply.code(200).send({ status: "ok" });
});

async function start() {
  try {
    await app.listen({ port: 3000, host: "127.0.0.1" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
