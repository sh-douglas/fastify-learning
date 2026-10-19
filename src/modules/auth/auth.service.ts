import type { Static } from "typebox";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { registerSchema } from "../../schemas/auth.schema.js";
import AppError from "../../shared/errors/app-error.js";
import argon2 from "argon2";

export type RegisterData = Static<typeof registerSchema>;

export async function registerUser(prisma: PrismaClient, data: RegisterData) {
  const cleanEmail = data.email.trim().toLowerCase();

  const registeredEmail = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  if (registeredEmail) {
    throw new AppError("Este e-mail já está cadastrado.", 409);
  }

  const passwordHash = await argon2.hash(data.password);

  const userData = {
    email: cleanEmail,
    passwordHash,
  };

  const newUser = await prisma.user.create({ data: userData });

  const publicUserData = {
    id: newUser.id,
    email: newUser.email,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };

  return publicUserData;
}

export async function authenticateUser(
  prisma: PrismaClient,
  data: RegisterData,
) {
  const cleanEmail = data.email.trim().toLowerCase();

  const registeredUser = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  if (!registeredUser) {
    throw new AppError("Credenciais inválidas.", 401);
  }

  const isValidPassword = await argon2.verify(
    registeredUser.passwordHash,
    data.password,
  );

  if (!isValidPassword) {
    throw new AppError("Credenciais inválidas.", 401);
  }

  return {
    id: registeredUser.id,
  };
}
