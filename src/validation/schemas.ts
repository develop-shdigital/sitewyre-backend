import { z } from "zod";

const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase, alphanumeric, and hyphen-separated");

export const projectSchema = z.object({
  title: z.string().min(1),
  slug,
  client: z.string().min(1),
  industry: z.string().min(1),
  location: z.string().optional(),
  category: z.string().min(1),
  description: z.string().min(1),
  challenge: z.string().min(1),
  approach: z.string().min(1),
  design: z.string().min(1),
  development: z.string().min(1),
  performance: z.string().min(1),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  filters: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  url: z.string().url().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  published: z.boolean().default(true),
});
export const projectUpdateSchema = projectSchema.partial();

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  projectSlug: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});
export const testimonialUpdateSchema = testimonialSchema.partial();

export const serviceSchema = z.object({
  slug,
  title: z.string().min(1),
  description: z.string().min(1),
  useCases: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order: z.number().default(0),
  published: z.boolean().default(true),
});
export const serviceUpdateSchema = serviceSchema.partial();

export const postSchema = z.object({
  title: z.string().min(1),
  slug,
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().default("SITEWYRE"),
  publishedAt: z.coerce.date().optional(),
});
export const postUpdateSchema = postSchema.partial();

export const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  website: z.string().optional(),
  projectType: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  message: z.string().min(1),
});
