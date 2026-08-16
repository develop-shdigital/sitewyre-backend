import { Router } from "express";
import { Lead } from "../models/Lead";
import { leadSchema } from "../validation/schemas";
import { requireAdmin } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../middleware/errorHandler";
import { leadsRateLimit } from "../middleware/rateLimit";
import { sendLeadNotification } from "../lib/email";

export const leadsRouter = Router();

// Public — this is what the frontend contact form submits to.
leadsRouter.post(
  "/",
  leadsRateLimit,
  validateBody(leadSchema),
  asyncHandler(async (req, res) => {
    const lead = await Lead.create(req.body);
    const emailSent = await sendLeadNotification(lead);
    if (emailSent) {
      lead.emailSent = true;
      await lead.save();
    }
    res.status(201).json({ ok: true });
  }),
);

// Admin — review submitted leads.
leadsRouter.get(
  "/",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  }),
);

leadsRouter.patch(
  "/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = req.body as { status?: string };
    if (!status || !["new", "contacted", "closed"].includes(status)) {
      res.status(400).json({ error: "status must be one of: new, contacted, closed" });
      return;
    }
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(lead);
  }),
);
