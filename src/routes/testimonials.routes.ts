import { Testimonial } from "../models/Testimonial";
import { testimonialSchema, testimonialUpdateSchema } from "../validation/schemas";
import { createCrudController } from "../controllers/crudFactory";
import { makeContentRouter } from "./makeContentRouter";

const controller = createCrudController({
  model: Testimonial,
  publishedFilter: { published: true },
  sort: { order: 1, createdAt: -1 },
});

export const testimonialsRouter = makeContentRouter({
  controller,
  createSchema: testimonialSchema,
  updateSchema: testimonialUpdateSchema,
});
