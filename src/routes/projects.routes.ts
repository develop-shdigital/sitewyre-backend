import { Project } from "../models/Project";
import { projectSchema, projectUpdateSchema } from "../validation/schemas";
import { createCrudController } from "../controllers/crudFactory";
import { makeContentRouter } from "./makeContentRouter";

const controller = createCrudController({
  model: Project,
  idField: "slug",
  publishedFilter: { published: true },
  sort: { featured: -1, order: 1, createdAt: -1 },
});

export const projectsRouter = makeContentRouter({
  controller,
  createSchema: projectSchema,
  updateSchema: projectUpdateSchema,
});
