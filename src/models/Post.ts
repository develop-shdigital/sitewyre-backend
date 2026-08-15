import { Schema, model, type InferSchemaType } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: { type: [String], default: [] },
    author: { type: String, default: "SITEWYRE" },
    // Null/undefined = draft, not returned by the public GET endpoint.
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

export type PostDoc = InferSchemaType<typeof postSchema>;
export const Post = model("Post", postSchema);
