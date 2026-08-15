import { Resend } from "resend";
import { env } from "../config/env";
import type { LeadDoc } from "../models/Lead";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

/**
 * Sends a lead-notification email via Resend. No-ops (logs instead) when
 * RESEND_API_KEY isn't configured, so leads still save successfully —
 * email is a notification convenience, not a requirement for the lead
 * to be captured.
 */
export async function sendLeadNotification(lead: LeadDoc): Promise<boolean> {
  if (!resend) {
    console.info("[email] RESEND_API_KEY not set — skipping lead notification email", { email: lead.email });
    return false;
  }

  const { error } = await resend.emails.send({
    from: env.LEADS_FROM_EMAIL,
    to: env.LEADS_NOTIFY_EMAIL,
    replyTo: lead.email,
    subject: `New project inquiry — ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      lead.company ? `Company: ${lead.company}` : null,
      lead.website ? `Website: ${lead.website}` : null,
      lead.projectType ? `Project type: ${lead.projectType}` : null,
      lead.budget ? `Budget: ${lead.budget}` : null,
      "",
      lead.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[email] Failed to send lead notification:", error);
    return false;
  }

  return true;
}
