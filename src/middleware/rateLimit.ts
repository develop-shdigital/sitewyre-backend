import rateLimit from "express-rate-limit";

/** Protects the public lead-submission endpoint from spam/abuse. */
export const leadsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions — please try again later." },
});
