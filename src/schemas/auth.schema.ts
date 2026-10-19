import { Type } from "typebox";

const registerSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export { registerSchema };
