import { Type } from "typebox";

const createProductSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  price: Type.Number({ exclusiveMinimum: 0 }),
  available: Type.Optional(Type.Boolean()),
});

const productParamsSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
});

const productQuerySchema = Type.Object({
  category: Type.Optional(Type.String({ minLength: 3 })),
});

export { createProductSchema, productParamsSchema, productQuerySchema };
