import { AccountRepository } from "@/api/contexts/accountManagement/infra/accountRepository";

export const queryAccountByEmail = async (accountEmail: string) => {
    const account = await AccountRepository.getByEmail(accountEmail);
    if (!account) return null;

    return {
        id: account.id,
        name: account.name,
        email: account.email,
        dateOfBirth: account.dateOfBirth,
        address: account.address,
        city: account.city,
        state: account.state,
        zipCode: account.zipCode,
        socialSecurity: account.socialSecurity,
        signupPlatform: account.signupPlatform,
        createdAt: account.createdAt,
      };
}

