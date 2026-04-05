import { z } from "zod";

// ✅ Schema (NOT a function)
export const authSchema = z.object({
  email: z.string().trim().email({ message: "Enter valid email" }).max(100),
  password: z
    .string()
    .trim()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(100),
});

// ✅ Middleware factory
export const validate = (Schema) => {
  return (req, res, next) => {
    const result = Schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors[0].message;
      return res.status(400).json({
        success: false,
        message,
      });
    }

    req.body = result.data;
    next();
  }}