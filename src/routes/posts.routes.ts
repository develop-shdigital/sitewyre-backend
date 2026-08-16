import { Post } from "../models/Post";
import { postSchema, postUpdateSchema } from "../validation/schemas";
import { createCrudController } from "../controllers/crudFactory";
import { makeContentRouter } from "./makeContentRouter";

const controller = createCrudController({
  model: Post,
  idField: "slug",
  // A post is "published" once publishedAt has passed, rather than a
  // separate boolean — evaluated per-request so scheduled posts go live
  // on their own without a server restart.
  publishedFilter: () => ({ publishedAt: { $ne: null, $lte: new Date() } }),
  sort: { publishedAt: -1 },
});

export const postsRouter = makeContentRouter({
  controller,
  createSchema: postSchema,
  updateSchema: postUpdateSchema,
});
