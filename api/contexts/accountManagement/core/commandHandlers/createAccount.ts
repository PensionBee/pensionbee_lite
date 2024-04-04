import { z } from "zod";

import { createCommandHandler } from "@/api/shared/core/commands/commandHandling";
import { accountSchema } from "@/api/contexts/accountManagement/core/entities/account.entity";
import type { Account } from "@/api/contexts/accountManagement/core/entities/account.entity";
import type {
    AccountSuccessEvents,
    AccountFailureEvents,
} from "@/api/contexts/accountManagement/core/entities/account.events";
import { throwOnDefaultCase } from "@/api/shared/common/typeUtils";
import { AccountRepository } from "@/api/contexts/accountManagement/infra/accountRepository";
import { queryAccountByEmail } from "@/api/contexts/accountManagement/core/queryHandlers/queryAccountByEmail";


// schemas
// -------

export const dataSchema = z.object({
    name: accountSchema.shape.name,
    email: accountSchema.shape.email,
    password: z.string(),
    dateOfBirth: z.date(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    socialSecurity: z.string(),
    signupPlatform: z.string(),
})

// types
// -----

type Data = z.infer<typeof dataSchema>;
type State = { existingAccount: Account | null };
type Event = AccountSuccessEvents | AccountFailureEvents;

// partials
// --------

const fetchState = async (data: Data): Promise<State> => {
    let existingAccount;
    try {
        existingAccount = await queryAccountByEmail(data.email);
    } catch (err) {
        existingAccount = null;
    }
    return { existingAccount };

};
const deriveEvent = (data: Data, state: State): Event => {
    const { existingAccount } = state;
    if ( existingAccount ) {
        return {
            type: "ACCOUNT_CREATION_FAILED/ACCOUNT_ALREADY_EXISTS",
            payload: {
                id: existingAccount.id,
            },
        }
    }
    return {
        type: "ACCOUNT_CREATED",
        payload: {
            id: Math.trunc(Math.random() * 10**10).toString(), // Just for testing, remove later.
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            socialSecurity: data.socialSecurity,
            signupPlatform: data.signupPlatform,
            createdAt: 'now',
        }
    }
};
const updateState = async (_state: State, event: Event) => {
    switch (event.type) {
        case "ACCOUNT_CREATED":
          await AccountRepository.create(event.payload);
          break;
        case "ACCOUNT_CREATION_FAILED/ACCOUNT_ALREADY_EXISTS":
          break;
        default:
          throwOnDefaultCase(event);
      }
};


// command handlers
// ----------------

export const createAccount = createCommandHandler({
    fetchState,
    deriveEvent,
    updateState,
});
