import { Service } from "../models/Service";
import { serviceSchema, serviceUpdateSchema } from "../validation/schemas";
import { createCrudController } from "../controllers/crudFactory";
import { makeContentRouter } from "./makeContentRouter";

const controller = createCrudController({
  model: Service,
  idField: "slug",
  publishedFilter: { published: true },
  sort: { order: 1, createdAt: -1 },
});

export const servicesRouter = makeContentRouter({
  controller,
  createSchema: serviceSchema,
  updateSchema: serviceUpdateSchema,
});
