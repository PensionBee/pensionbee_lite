/**
 * Forces all switch cases to be explicitly handled (in TS) or throws an error if a value slips through at runtime (JS)
 *
 * @param value - The value being checked in the switch statement.
 *
 * @example
 *
 * type Value = "A" | "B" | "C"
 *
 * switch (value: Value) {
 *   case "A":
 *     // do something
 *     break
 *   case "B":
 *     // do something
 *     break
 *   default:
 *     throwOnDefaultCase(value); // TS Error - case "C" is unhandled
 */
export const throwOnDefaultCase = (value: never): never => {
    throw new Error(
      `${value} was unexpectedly handled by a default switch block`
    );
  };
  