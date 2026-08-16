import { z } from "zod";

const schema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  ADMIN_API_KEY: z.string().min(16, "ADMIN_API_KEY must be at least 16 characters"),
  ALLOWED_ORIGINS: z.string().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().optional(),
  LEADS_FROM_EMAIL: z.string().default("leads@sitewyre.com"),
  LEADS_NOTIFY_EMAIL: z.string().default("hello@sitewyre.com"),
  PORT: z.coerce.number().default(4000),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Missing or invalid environment variables — see .env.example");
}

export const env = {
  ...parsed.data,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(",").map((o) => o.trim()),
  emailEnabled: Boolean(parsed.data.RESEND_API_KEY),
};
