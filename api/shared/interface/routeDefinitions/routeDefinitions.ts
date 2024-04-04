import { type z } from "zod";

import { type Client } from "../utils/clients";
import { type AllowedCustomers, type RouteDefinitionRequest } from "@/api/shared/interface/routeDefinitions/requests";
import {
  type ClientErrorResponse,
  type RedirectResponse,
  type RouteDefinitionResponse,
  type ServerErrorResponse,
  type SuccessResponse,
} from "@/api/shared/interface/routeDefinitions/responses";

// Types
// -----

type SupportedMethods = "get" | "post";

export type RouteDefinitionRequestSchemas =
  RouteDefinition["config"]["requestSchemas"];

export type RouteDefinitionResponseSchemas =
  RouteDefinition["config"]["responseSchemas"];

/**
 * A Route Definition is an internal concept which captures the essential aspects
 * of an API endpoint, such as the URI, request/response validation, authentication
 * requirements, the request handler function, etc. These definitions can be used to
 * set up API Endpoints as well as OpenAPI documentation.
 */
export type RouteDefinition<
  TMethod extends SupportedMethods = SupportedMethods,
  TAllowedCustomers extends AllowedCustomers = AllowedCustomers,
  TRequestParamsSchema extends z.AnyZodObject = any,
  TRequestQuerySchema extends z.AnyZodObject = any,
  TRequestBodySchema extends z.AnyZodObject = any,
  TResponseBodySchema extends z.AnyZodObject = any
> = {
  method: TMethod;
  path: `/${string}`;
  summary: string;
  config: {
    allowedClients: Exclude<Client, "unknown">[];
    allowedCustomers: TAllowedCustomers;
    requestSchemas: {
      pathParams?: TRequestParamsSchema;
      queryParams?: TRequestQuerySchema;
      body?: TRequestBodySchema;
    };
    responseSchemas: {
      body?: TResponseBodySchema;
    };
    hideInProduction?: boolean;
  };
  handleRequest: (args: {
    request: RouteDefinitionRequest<
      TAllowedCustomers,
      z.infer<TRequestParamsSchema>,
      z.infer<TRequestQuerySchema>,
      z.infer<TRequestBodySchema>
    >;
    response: RouteDefinitionResponse<TResponseBodySchema>;
  }) => Promise<
    | SuccessResponse<z.infer<TResponseBodySchema>>
    | RedirectResponse
    | ClientErrorResponse
    | ServerErrorResponse
  >;
};

// Utils
// -----

/**
 * An 'identity' function which enforces conformity to a POST route definition
 * and provides TS support for the route definition's request handler
 *
 * @example
 *
 * import { z } from "zod";
 *
 * import {
 * createRouteDefinition,
 * type RouteDefinitionRequestSchemas,
 * type RouteDefinitionResponseSchemas,
 * } from "~/shared/interface/routeDefinitions/routeDefinitions";
 * // other imports
 *
 * // Schemas
 * // -------
 *
 * const requestSchemas = {
 *   queryParams: z.object({
 *     limit: z.coerce.number().int().positive().optional().default(10),
 *     offset: z.coerce.number().int().nonnegative().optional().offset(0),
 *   }),
 * } satisfies RouteDefinitionRequestSchemas
 *
 * const responseSchemas = {
 *   body: z.object({
 *     transfers: z.array(
 *       z.object({
 *         id: z.string(),
 *         policyNumber: z.string.nullable(),
 *         // other attributes
 *       })
 *     ),
 *   }),
 * } satisfies RouteDefinitionResponseSchemas
 *
 * // Route Definition
 * // ----------------
 *
 * export const getTransfersRouteDefinition = createRouteDefinition({
 *   method: 'get',
 *   path: "/transfers", // use "{...}" for dynamic path segments, e.g. "/transfers/{transferId}"
 *   summary: "Returns all transfers for a account",
 *   config: {
 *     allowedClients: ["mobile", "web"],
 *     allowedCustomers: "accountsOnly",
 *     requestSchemas,
 *     responseSchemas,
 *     hideInProduction: true,
 *   },
 *   handleRequest: async ({ request, response }) => {
 *     const accountId = request.customer.sfid;
 *
 *     const transfers = await queryCustomerTransfers({
 *       accountId,
 *       limit,
 *       offset,
 *     });
 *
 *     return response.success({ transfers });
 *   },
 * });
 */
export const createRouteDefinition = <
  TMethod extends SupportedMethods,
  TAllowedCustomers extends AllowedCustomers,
  TRequestParamsSchema extends z.AnyZodObject,
  TRequestQuerySchema extends z.AnyZodObject,
  TRequestBodySchema extends z.AnyZodObject,
  TResponseBodySchema extends z.AnyZodObject
>(
  routeDefinition: RouteDefinition<
    TMethod,
    TAllowedCustomers,
    TRequestParamsSchema,
    TRequestQuerySchema,
    TRequestBodySchema,
    TResponseBodySchema
  >
) => routeDefinition;
