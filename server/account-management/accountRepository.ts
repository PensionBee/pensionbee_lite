import prisma from '@/lib/prisma';

export type AccountRepository = {
    checkAccountExists: () => string;
    getByEmail: () => string;
    createAccount: () => string;
    completeAccount: () => string;
}

export const accountRepository = {
    checkAccountExists: async (email: string) => {
        const account = await prisma.account.findMany({
            where: { email },
        })
        return { data: !!account };
    },
    getByEmail: async (email: string) => {
        const account = await prisma.account.findMany({
            where: { email },
        })
        return account;
    },
    createAccount: async () => {
        return { message: "Create new account" };
    },
    completeAccount: async () => {
        return { message: "Complete account" };
    }
}
