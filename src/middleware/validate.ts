import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

/** Validates req.body against `schema`; replaces it with the parsed (defaulted/coerced) result. */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Validation failed", details: result.error.flatten() });
      return;
    }
    req.body = result.data;
    next();
  };
}
