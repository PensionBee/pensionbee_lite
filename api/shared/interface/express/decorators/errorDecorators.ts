import { type RequestHandler } from "express";

import { logAndReportError } from "../../../common/errors";

/**
 * Decorates a request handler (sync or async) and handles any
 * thrown errors consistently
 *
 * @example
 *
 * const router = express.Router();
 *
 * router.get(
 *   'api/orders/...',
 *   ...
 *   withErrorHandling(async (req, res) => {
 *     // do something
 *   })
 * )
 */
export const withErrorHandling =
  (handleRequest: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await handleRequest(req, res, next);
    } catch (error) {
      // Note: we can handle commonly thrown custom error instances here
      logAndReportError(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
