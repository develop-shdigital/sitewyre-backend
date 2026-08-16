import { Schema, model, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String },
    category: { type: String, required: true },
    description: { type: String, required: true },
    challenge: { type: String, required: true },
    approach: { type: String, required: true },
    design: { type: String, required: true },
    development: { type: String, required: true },
    performance: { type: String, required: true },
    services: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    filters: { type: [String], default: [] },
    images: { type: [String], default: [] },
    url: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export const Project = model("Project", projectSchema);
