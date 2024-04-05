// Types
// -----

export type AllowedCustomers =
  | "accountsOnly"
  | "all";

export type CustomerAttributes<
  TAllowedCustomers extends AllowedCustomers = AllowedCustomers
> = TAllowedCustomers extends "accountsOnly"
  ? {
      isAccount: () => true;
    }
  : TAllowedCustomers extends "all"
  ?
      | {
          isAccount: () => boolean;
        }
      | undefined
  : undefined;

/**
 * An internal representation of a HTTP request, which is used by route definition
 * request handlers.
 */
export type RouteDefinitionRequest<
  TAllowedCustomers extends AllowedCustomers = AllowedCustomers,
  TParams extends Record<string, unknown> = Record<string, unknown>,
  TQuery extends Record<string, unknown> = Record<string, unknown>,
  TBody extends Record<string, unknown> = Record<string, unknown>
> = {
  params: TParams;
  query: TQuery;
  body: TBody;
  customer: CustomerAttributes<TAllowedCustomers>;
};

// Utils
// -----

export const createRouteDefinitionRequest = (args: {
  customer: CustomerAttributes;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  body: Record<string, unknown>;
}): RouteDefinitionRequest => {
  const { body, customer, params, query } = args;

  return {
    params,
    query,
    body,
    customer: customer || undefined,
  };
};
