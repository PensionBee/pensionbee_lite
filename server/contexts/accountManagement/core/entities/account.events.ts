import type { Account } from "@/server/contexts/accountManagement/core/entities/account.entity";

export type AccountSuccessEvents = AccountCreatedEvent;
export type AccountFailureEvents = AccountCreationFailedAlreadyExists;

// Success events
// --------------

type AccountCreatedEvent = {
  type: "ACCOUNT_CREATED";
  payload: {
    id: Account["id"];
    name: Account["name"];
    email: Account["email"];
    dateOfBirth: Account["dateOfBirth"];
    address: Account["address"];
    city: Account["city"];
    state: Account["state"];
    zipCode: Account["zipCode"];
    socialSecurity: Account["socialSecurity"];
    signupPlatform: Account["signupPlatform"];
    createdAt: Account["createdAt"];
  };
};

// Failure events
// --------------

type AccountCreationFailedAlreadyExists = {
  type: "ACCOUNT_CREATION_FAILED/ACCOUNT_ALREADY_EXISTS";
  payload: {
    id: Account["id"];
  };
};