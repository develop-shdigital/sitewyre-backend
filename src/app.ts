import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { projectsRouter } from "./routes/projects.routes";
import { testimonialsRouter } from "./routes/testimonials.routes";
import { servicesRouter } from "./routes/services.routes";
import { postsRouter } from "./routes/posts.routes";
import { leadsRouter } from "./routes/leads.routes";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.allowedOrigins,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/projects", projectsRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/posts", postsRouter);
app.use("/api/leads", leadsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
