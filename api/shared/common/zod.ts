import { type z } from "zod";

export const formatZodError = (zodError: z.ZodError) =>
  `\n${zodError.issues
    .map((issue) => `- ${issue.path.join(".")} (${issue.message})`)
    .join("\n")}`;
