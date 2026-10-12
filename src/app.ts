import Fastify from "fastify";
import { productsRoutes } from "./modules/products/products.routes.js";

function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(productsRoutes, { prefix: "/products" });

  app.get("/health", (request, reply) => {
    return { status: "ok" };
  });

  return app;
}

export { buildApp };
