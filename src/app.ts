import Fastify from "fastify";
import { productsRoutes } from "./modules/products/products.routes.js";
import AppError from "./shared/errors/app-error.js";
import prismaPlugin from "./plugins/prisma.plugin.js";

function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    if (error instanceof Error && "validation" in error) {
      return reply.code(400).send({
        message: "Validation error",
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: "Internal server error.",
    });
  });
  app.register(prismaPlugin);
  app.register(productsRoutes, { prefix: "/products" });

  app.get("/health", (request, reply) => {
    return { status: "ok" };
  });

  return app;
}

export { buildApp };
