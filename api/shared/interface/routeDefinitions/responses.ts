import { type z } from "zod";

import { logAndReportError } from "@/api/shared/common/errors";
import { formatZodError } from "@/api/shared/common/zod";

// Types
// -----

export type SuccessResponse<TData extends Record<string, unknown>> = {
  status: 200; // OK
  data: TData;
};
export type RedirectResponse = {
  status: 301; // Moved Permanently
  data: undefined;
};
export type ClientErrorResponse = {
  status:
    | 400 // Bad Request
    | 401 // Unauthorized
    | 403 // Forbidden
    | 404 // Not Found
    | 409 // Conflict
    | 422; // Unprocessable Content
  data: {
    error: string;
  };
};
export type ServerErrorResponse = {
  status: 500; // Internal Server Error
  data: {
    error: string;
  };
};

/**
 * An internal representation of a response, which is used by route definition
 * request handlers.
 */
export type RouteDefinitionResponse<
  TResponseBodySchema extends z.AnyZodObject = z.AnyZodObject
> = {
  success: (
    data?: z.infer<TResponseBodySchema>
  ) => SuccessResponse<z.infer<TResponseBodySchema>> | ServerErrorResponse;
  movedPermanently: () => RedirectResponse;
  badRequest: (error: string) => ClientErrorResponse;
  unauthorised: (error: string) => ClientErrorResponse;
  forbidden: (error: string) => ClientErrorResponse;
  notFound: (error: string) => ClientErrorResponse;
  conflict: (error: string) => ClientErrorResponse;
  unprocessableContent: (error: string) => ClientErrorResponse;
  internalServerError: () => ServerErrorResponse;
};

// Utils
// -----

/**
 * Creates a Route Definition Response object.
 *
 * Note that an optional successResponseBodySchema argument can be provided upon
 * initialization, which will be used to validate response data whenever 'success' is called.
 */
export const createRouteDefinitionResponse = <
  TResponseBodySchema extends z.AnyZodObject
>(
  successResponseBodySchema?: TResponseBodySchema
): RouteDefinitionResponse<TResponseBodySchema> => ({
  success: (
    data?: z.infer<TResponseBodySchema>
  ): SuccessResponse<z.infer<TResponseBodySchema>> | ServerErrorResponse => {
    if (data && !successResponseBodySchema) {
      logAndReportError("No response body validation schema was provided");
      return {
        status: 500,
        data: {
          error: "Something went wrong",
        },
      };
    }

    if (!successResponseBodySchema) {
      return {
        status: 200,
        data: data ?? {},
      };
    }

    const result = successResponseBodySchema.safeParse(data);
    if (!result.success) {
      const error = formatZodError(result.error);
      logAndReportError(error);
      return {
        status: 500,
        data: {
          error: "Something went wrong",
        },
      };
    }

    return {
      status: 200,
      data: result.data,
    };
  },
  movedPermanently: (): RedirectResponse => ({
    status: 301,
    data: undefined,
  }),
  badRequest: (error: string): ClientErrorResponse => {
    return {
      status: 400,
      data: {
        error: `Bad Request: ${error}`,
      },
    };
  },
  unauthorised: (error: string): ClientErrorResponse => {
    return {
      status: 401,
      data: {
        error: `Unauthorised: ${error}`,
      },
    };
  },
  forbidden: (error: string): ClientErrorResponse => {
    return {
      status: 403,
      data: {
        error: `Forbidden: ${error}`,
      },
    };
  },
  notFound: (error: string): ClientErrorResponse => {
    return {
      status: 404,
      data: {
        error: `Not Found: ${error}`,
      },
    };
  },
  conflict: (error: string): ClientErrorResponse => {
    return {
      status: 409,
      data: {
        error: `Conflict: ${error}`,
      },
    };
  },
  unprocessableContent: (error: string): ClientErrorResponse => {
    return {
      status: 422,
      data: {
        error: `Unprocessable Content: ${error}`,
      },
    };
  },
  internalServerError: (): ServerErrorResponse => {
    return {
      status: 500,
      data: {
        error: "Internal Server Error: Something went wrong",
      },
    };
  },
});
