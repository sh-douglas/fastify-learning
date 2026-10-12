import Fastify from "fastify";
import { productsRoutes } from "./modules/products/products.routes.js";

const app = Fastify({
  logger: true,
});

app.register(productsRoutes, { prefix: "/products" });

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
