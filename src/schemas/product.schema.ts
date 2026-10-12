import { Type } from "typebox";

const createProductSchema = Type.Object({
  name: Type.String({ minLength: 3 }),
  price: Type.Number({ exclusiveMinimum: 0 }),
  available: Type.Optional(Type.Boolean()),
});

export { createProductSchema };
