import type { Request, Response } from "express";
import type { Model, FilterQuery, SortOrder } from "mongoose";

interface CrudOptions {
  model: Model<any>;
  /** Field used in the URL (e.g. "slug") to look up a single record. Defaults to "_id". */
  idField?: string;
  /**
   * Filter applied on the public (unauthenticated) list/get endpoints —
   * e.g. { published: true }. Accepts a thunk (evaluated per-request)
   * instead of a plain object when the filter depends on the current time
   * (e.g. scheduled posts), so it doesn't get frozen at server-startup time.
   */
  publishedFilter: FilterQuery<any> | (() => FilterQuery<any>);
  sort?: Record<string, SortOrder>;
}

/**
 * Shared CRUD handlers for the four content models (Project, Testimonial,
 * Service, Post) — they're structurally identical (public read, admin
 * write, optional draft/publish filter), so the logic lives here once
 * instead of four times. Callers apply validateBody(schema) as route
 * middleware before create/update, so req.body already holds parsed data.
 */
export function createCrudController({
  model,
  idField = "_id",
  publishedFilter,
  sort = { order: 1, createdAt: -1 },
}: CrudOptions) {
  // req.params.id is always a string once a ":id" route has matched;
  // noUncheckedIndexedAccess just can't see that guarantee from the type.
  function lookup(req: Request) {
    const value = req.params.id as string;
    return idField === "_id" ? { _id: value } : { [idField]: value };
  }

  function resolveFilter() {
    return typeof publishedFilter === "function" ? publishedFilter() : publishedFilter;
  }

  return {
    publicList: async (_req: Request, res: Response) => {
      const docs = await model.find(resolveFilter()).sort(sort);
      res.json(docs);
    },

    publicGetOne: async (req: Request, res: Response) => {
      const doc = await model.findOne({ ...lookup(req), ...resolveFilter() });
      if (!doc) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(doc);
    },

    adminList: async (_req: Request, res: Response) => {
      const docs = await model.find({}).sort(sort);
      res.json(docs);
    },

    adminGetOne: async (req: Request, res: Response) => {
      const doc = await model.findOne(lookup(req));
      if (!doc) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(doc);
    },

    create: async (req: Request, res: Response) => {
      const doc = await model.create(req.body);
      res.status(201).json(doc);
    },

    update: async (req: Request, res: Response) => {
      const doc = await model.findOneAndUpdate(lookup(req), req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(doc);
    },

    remove: async (req: Request, res: Response) => {
      const doc = await model.findOneAndDelete(lookup(req));
      if (!doc) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(204).send();
    },
  };
}
