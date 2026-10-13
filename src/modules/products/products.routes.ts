import type { FastifyPluginAsync } from "fastify";
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
} from "../../schemas/product.schema.js";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const productsRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.addHook("onRequest", async (request) => {
    request.log.info("Product route requested");
  });

  app.addHook("preHandler", async (request) => {
    request.log.info("Product preHandler executed");
  });

  app.get("/protected", {
    preHandler: async (request, reply) => {
      const key = request.headers["x-api-key"];

      if (key !== "secret123") {
        return reply.code(401).send({ message: "Unauthorized." });
      }
    },
    handler: async (request, reply) => {
      return reply.code(200).send({ message: "Access granted." });
    },
  });

  app.get(
    "/:id",
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

  app.get(
    "/",
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

  app.post("/", {
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
};

export { productsRoutes };
