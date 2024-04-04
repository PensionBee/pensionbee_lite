// import AccountData from '@/api/models/account';
import accountData from '@/api/models/account';
import type AccountModel from '@/api/models/accountModel.types';
import {
    parseAccount,
    parseNewAccount,
    type Account,
    type NewAccount,
} from "@/api/contexts/accountManagement/core/entities/account.entity"

// Types
// -----

type AccountData = Pick<
    AccountModel,
    | "id"
    | "name"
    | "email"
    | "dateOfBirth"
    | "address"
    | "city"
    | "state"
    | "zipCode"
    | "socialSecurity"
    | "signupPlatform"
    | "createdAt"
>;

type NewAccountData = Omit<AccountData, "id">;

export type AccountRepository = {
    create: (newAccount: Account) => Promise<Account>;
    getByEmail: (email: string) => Promise<Account>;
}

// Mappers
// -------

export const toAccountEntity = () => {

    // return parseAccount();
}

export const toAccountModel = () => {

    // return parseNewAccount();
}

// Repository

export const AccountRepository = {
    create: async (newAccount: NewAccount) => {
        
    },
    getByEmail: async (email: string) => {
        return accountData.find((account) => account.email === email)
    }
}