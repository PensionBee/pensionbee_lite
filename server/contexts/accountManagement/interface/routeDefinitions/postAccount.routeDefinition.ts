import { z } from "zod";

import {
    createRouteDefinition,
    type RouteDefinitionRequestSchemas,
    type RouteDefinitionResponseSchemas,
} from "@/server/shared/interface/routeDefinitions/routeDefinitions";
import { throwOnDefaultCase } from "@/server/shared/common/typeUtils";
import { createAccount } from "@/server/contexts/accountManagement/core/commandHandlers/createAccount";

// Request & Response Schemas
// --------------------------

const requestSchemas = {
    body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    dateOfBirth: z.date(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    socialSecurity: z.string(),
    signupPlatform: z.string(),
    }),
} satisfies RouteDefinitionRequestSchemas;

const responseSchemas = {
    body: z.object({
        id: z.string(),
    }),
} satisfies RouteDefinitionResponseSchemas;

export const postAccountRouteDefinition = createRouteDefinition({
    method: "post",
    path: "/post-account",
    summary: "Creates a new account",
    config: {
        allowedClients: ["mobile", "web"],
        allowedCustomers: "all",
        requestSchemas,
        responseSchemas,
    },
    handleRequest: async ({ request, response }) => {
        const accountEvent = await createAccount(request.body);
        const {
            type: eventType,
            payload: { id },
          } = accountEvent;

        switch (eventType) {
            case "ACCOUNT_CREATED":
                return response.success({ id });
            case "ACCOUNT_CREATION_FAILED/ACCOUNT_ALREADY_EXISTS":
                return response.conflict(
                    "An account already exists for this email address"
                  );
            default:
                return throwOnDefaultCase(eventType);
        }
    }
})