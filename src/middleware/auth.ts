import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

/**
 * Single shared-secret admin auth for write routes. There's one operator
 * (SITEWYRE), so a bearer API key is enough — no user accounts, sessions,
 * or login flow to build and maintain.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token || token !== env.ADMIN_API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
