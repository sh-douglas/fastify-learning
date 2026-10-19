import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterData } from "./auth.service.js";
import { authenticateUser, registerUser } from "./auth.service.js";

export async function registerUserController(
  request: FastifyRequest<{ Body: RegisterData }>,
  reply: FastifyReply,
) {
  const user = await registerUser(request.server.prisma, request.body);

  return reply.code(201).send(user);
}

export async function authenticateUserController(
  request: FastifyRequest<{ Body: RegisterData }>,
  reply: FastifyReply,
) {
  const user = await authenticateUser(request.server.prisma, request.body);
  const token = request.server.jwt.sign({
    sub: user.id,
  });

  return reply.code(200).send({ token });
}
