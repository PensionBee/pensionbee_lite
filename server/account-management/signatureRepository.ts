export type SignatureRepository = {
    getByCustomer: () => string;
    createSignature: () => string;
}

export const signatureRepository = {
    getByCustomer: async () => {
        return { message: "Get signature by customer" };
    },
    createSignature: async () => {
        return { message: "Create new signature" };
    },
}