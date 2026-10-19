import "dotenv/config";
import fastifyJwt from "@fastify/jwt";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is required.");
}

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret,
    sign: {
      expiresIn: "15m",
    },
  });
};

export default fp(jwtPlugin);
