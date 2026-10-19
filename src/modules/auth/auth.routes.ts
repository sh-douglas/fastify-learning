import type { FastifyPluginAsync } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { registerSchema } from "../../schemas/auth.schema.js";
import {
  authenticateUserController,
  registerUserController,
} from "./auth.controller.js";

const userRoutes: FastifyPluginAsync = async (fastify) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

  app.post("/register", {
    schema: {
      body: registerSchema,
    },
    handler: registerUserController,
  });

  app.post("/login", {
    schema: {
      body: registerSchema,
    },
    handler: authenticateUserController,
  });
};

export { userRoutes };
