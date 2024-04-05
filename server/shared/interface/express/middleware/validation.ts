import { type RequestHandler } from "express";
import { type z } from "zod";

import { logAndReportError } from "@/server/shared/common/errors";
import { formatZodError } from "@/server/shared/common/zod";

/**
 * Validates the request path parameters against a provided zod schema
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/orders/...',
 *   ...
 *   validateRequestPathParams(z.object({
 *     ...
 *   })),
 *   ...
 * )
 */
export const validateRequestPathParams =
  (requestParamsSchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestParamsSchema.safeParse(req.params);
    if (!result.success) {
      const error = formatZodError(result.error);
      logAndReportError(error, "info");
      return res.status(400).json({ error });
    }
    req.params = result.data;
    return next();
  };

/**
 * Validates the request query parameters against a provided zod schema
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/orders/...',
 *   ...
 *   validateRequestQueryParams(z.object({
 *     ...
 *   })),
 *   ...
 * )
 */
export const validateRequestQueryParams =
  (requestQuerySchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestQuerySchema.safeParse(req.query);
    if (!result.success) {
      const error = formatZodError(result.error);
      logAndReportError(error, "info");
      return res.status(400).json({ error });
    }
    req.query = result.data;
    return next();
  };

/**
 * Validates the request body against a provided zod schema
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/orders/...',
 *   ...
 *   validateRequestBody(z.object({
 *     ...
 *   })),
 *   ...
 * )
 */
export const validateRequestBody =
  (requestBodySchema: z.AnyZodObject): RequestHandler =>
  (req, res, next) => {
    const result = requestBodySchema.safeParse(req.body);
    if (!result.success) {
      const error = formatZodError(result.error);
      logAndReportError(error, "info");
      return res.status(400).json({ error });
    }
    req.body = result.data;
    return next();
  };
