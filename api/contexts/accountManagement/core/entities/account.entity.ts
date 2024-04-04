import { z } from "zod";
import { createEntityParser } from "@/api/shared/core/entities/entityParsing";

// schemas
// -------

export const accountSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    dateOfBirth: z.date(),
    address: z.string(),
    state: z.string(),
    city: z.string(),
    zipCode: z.string(),
    socialSecurity: z.string(),
    signupPlatform: z.string(),
    createdAt: z.string(),
});

export const newAccountSchema = accountSchema.omit({
    id: true,
});

// types
// -----

export type Account = z.infer<typeof accountSchema>;
export type NewAccount = z.infer<typeof newAccountSchema>;

// parsers
// -------

export const parseAccount = createEntityParser(accountSchema);
export const parseNewAccount = createEntityParser(newAccountSchema);