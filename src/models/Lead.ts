import { Schema, model, type InferSchemaType } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    website: { type: String },
    projectType: { type: String, default: "" },
    budget: { type: String, default: "" },
    message: { type: String, required: true },
    source: { type: String, default: "contact-form" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const Lead = model("Lead", leadSchema);
