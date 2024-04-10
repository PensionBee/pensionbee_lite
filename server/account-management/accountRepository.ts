export type AccountRepository = {
    getByEmail: () => string;
    createAccount: () => string;
    completeAccount: () => string;
}

export const accountRepository = {
    getByEmail: async () => {
        return { message: "Get account by email" };
    },
    createAccount: async () => {
        return { message: "Create new account" };
    },
    completeAccount: async () => {
        return { message: "Complete account" };
    }
}