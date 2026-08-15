import { Router } from "express";
import type { ZodSchema } from "zod";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../middleware/errorHandler";
import type { createCrudController } from "../controllers/crudFactory";

interface RouterOptions {
  controller: ReturnType<typeof createCrudController>;
  createSchema: ZodSchema;
  updateSchema: ZodSchema;
}

/**
 * Standard route set for a content type: public reads (published only),
 * admin reads (everything, including drafts), and admin-gated writes.
 * More specific "/admin" paths are registered before the generic "/:id"
 * so Express doesn't swallow them as an id lookup.
 */
export function makeContentRouter({ controller, createSchema, updateSchema }: RouterOptions) {
  const router = Router();

  router.get("/admin", requireAdmin, asyncHandler(controller.adminList));
  router.get("/admin/:id", requireAdmin, asyncHandler(controller.adminGetOne));

  router.get("/", asyncHandler(controller.publicList));
  router.get("/:id", asyncHandler(controller.publicGetOne));

  router.post("/", requireAdmin, validateBody(createSchema), asyncHandler(controller.create));
  router.patch("/:id", requireAdmin, validateBody(updateSchema), asyncHandler(controller.update));
  router.delete("/:id", requireAdmin, asyncHandler(controller.remove));

  return router;
}
