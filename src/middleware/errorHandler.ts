import type { Request, Response, NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "ValidationError") {
    res.status(400).json({ error: "Validation failed", details: String((err as Error).message) });
    return;
  }

  if (err && typeof err === "object" && "code" in err && (err as { code: number }).code === 11000) {
    res.status(409).json({ error: "A record with that slug already exists" });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/** Forwards rejected promises from async route handlers into errorHandler. */
export function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
