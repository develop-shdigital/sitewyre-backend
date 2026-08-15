import type { VercelRequest, VercelResponse } from "@vercel/node";
import { app } from "../src/app";
import { connectToDatabase } from "../src/db/connect";

/**
 * Vercel serverless entrypoint. vercel.json rewrites every request here;
 * the Express app itself (routing, middleware, error handling) is
 * identical to what runs locally via src/server.ts.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectToDatabase();
  return app(req as any, res as any);
}
