import { type RequestHandler, type Router } from "express";

import { createRouteDefinitionRequest } from "../routeDefinitions/requests";
import { createRouteDefinitionResponse } from "../routeDefinitions/responses";
import { type RouteDefinition } from "../routeDefinitions/routeDefinitions";
import { withErrorHandling } from "./decorators/errorDecorators";
import {
  validateRequestBody as validateRequestBodyMiddleware,
  validateRequestPathParams as validateRequestPathParamsMiddleware,
  validateRequestQueryParams as validateRequestQueryParamsMiddleware,
} from "./middleware/validation";

// Utils
// -----

/**
 * Converts dynamic path segment, e.g. '/{orderId}/{itemId}', to express equivalent, e.g. '/:orderId/:itemId'
 */
const transformToExpressPath = (path: string) =>
  path.replace(/{/g, ":").replace(/}/g, "");

/**
 * Helper function to map Route Definitions to Express API routes.
 *
 * @param router - An Express router to mount the endpoints on
 * @param basePath - A URL path segment used to prefix all routes
 * @param routeDefinitions - An array of Route Definitions to be turned into express API endpoints
 *
 * @example
 *
 * export const exampleRouter = express.Router();
 *
 * export const exampleBasePath = '/api/example'
 *
 * const routeDefinitions = [
 *   // GET routes
 *   getFooRouteDefinition,
 *   getBarRouteDefinition,
 *   // POST routes
 *   changeFooRouteDefinition,
 *   changeBarRouteDefinition
 * ]
 *
 * setUpExpressRoutes(
 *   exampleRouter,
 *   exampleBasePath,
 *   routeDefinitions
 * );
 */
export const setUpExpressRoutes = (
  router: Router,
  basePath: `/${string}`,
  routeDefinitions: RouteDefinition[]
) => {
  routeDefinitions.forEach((routeDefinition) => {
    const {
      method,
      path,
      config: {
        requestSchemas,
        responseSchemas,
      },
      handleRequest,
    } = routeDefinition;

    const middleware: RequestHandler[] = [];

    // Add request validation middleware, if required
    if (requestSchemas.pathParams) {
      middleware.push(
        validateRequestPathParamsMiddleware(requestSchemas.pathParams)
      );
    }
    if (requestSchemas.queryParams) {
      middleware.push(
        validateRequestQueryParamsMiddleware(requestSchemas.queryParams)
      );
    }
    if (requestSchemas.body) {
      middleware.push(validateRequestBodyMiddleware(requestSchemas.body));
    }

    // Set up the router
    router[method](
      transformToExpressPath(`${basePath}${path}`),
      ...middleware,
      withErrorHandling(async (req, res) => {
        const request = createRouteDefinitionRequest({
          body: req.body,
          customer: req.customer,
          params: req.params,
          query: req.query,
        });
        const response = createRouteDefinitionResponse(responseSchemas.body);

        const { status, data } = await handleRequest({ request, response });

        return res.status(status).json(data);
      })
    );
  });
};
