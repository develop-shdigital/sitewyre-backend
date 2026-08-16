import { Schema, model, type InferSchemaType } from "mongoose";

const testimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    projectSlug: { type: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema>;
export const Testimonial = model("Testimonial", testimonialSchema);
