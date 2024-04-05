import { type z } from "zod";

import { BaseError } from "../../common/errors";
import { formatZodError } from "../../common/zod";

/**
 * An error that can be thrown when the entities end up in an invalid state.
 * This could happen when modifying an entity or reconstructing an entity from persistence
 */
export class EntityInvalidError extends BaseError {
  constructor(zodError: z.ZodError) {
    super({
      debugDetails: formatZodError(zodError),
      clientMessage: "Oops! Something went wrong. Please try again later.",
      severity: "error",
    });
  }
}
