import mongoose from "mongoose";
import { env } from "../config/env";

let connectionPromise: Promise<typeof mongoose> | null = null;

/**
 * Reuses a single connection across invocations — required on Vercel, where
 * each serverless invocation can reuse a warm module scope but must not
 * open a fresh MongoDB connection every time.
 */
export function connectToDatabase() {
  if (!connectionPromise) {
    mongoose.set("strictQuery", true);
    connectionPromise = mongoose.connect(env.MONGODB_URI);
  }
  return connectionPromise;
}
