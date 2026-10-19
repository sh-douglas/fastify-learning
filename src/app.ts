import Fastify, { type FastifyRequest } from "fastify";
import { productsRoutes } from "./modules/products/products.routes.js";
import { userRoutes } from "./modules/auth/auth.routes.js";
import AppError from "./shared/errors/app-error.js";
import prismaPlugin from "./plugins/prisma.plugin.js";
import jwtPlugin from "./plugins/jwt.plugin.js";

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

    if (
      error instanceof Error &&
      "statusCode" in error &&
      typeof error.statusCode === "number" &&
      error.statusCode >= 400 &&
      error.statusCode < 500
    ) {
      return reply.code(error.statusCode).send({
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      message: "Internal server error.",
    });
  });

  app.register(prismaPlugin);
  app.register(jwtPlugin);
  app.register(productsRoutes, { prefix: "/products" });
  app.register(userRoutes, { prefix: "/auth" });

  const ensureAuth = async (request: FastifyRequest) => {
    await request.jwtVerify();
  };

  app.get(
    "/auth/me",
    {
      preHandler: ensureAuth,
    },
    (request, reply) => {
      return {
        user: request.user,
      };
    },
  );

  app.get("/health", (request, reply) => {
    return { status: "ok" };
  });

  return app;
}

export { buildApp };
