import { type z } from "zod";

import { EntityInvalidError } from "./entityErrors";

/**
 * Given a zod schema which defines an entity, create a parser function which can
 * be called with a blob of data. The data will be parsed with the schema, returning
 * a valid entity or throwing an instance of the EntityInvalidError class.
 */
export const createEntityParser =
  <S extends z.AnyZodObject>(schema: S) =>
  (data: Record<string, unknown>): z.infer<S> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new EntityInvalidError(result.error);
    }
    return result.data;
  };
