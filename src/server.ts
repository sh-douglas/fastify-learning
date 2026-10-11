import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

interface ProductParams {
  id: string;
}

app.get<{ Params: ProductParams }>("/products/:id", (request, reply) => {
  const { id } = request.params;
  return reply.code(200).send({ productId: id });
});

interface ProductQuery {
  category?: string;
}

app.get<{ Querystring: ProductQuery }>("/products", (request, reply) => {
  const { category } = request.query;

  return reply.code(200).send({ category: category ?? "all" });
});

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
