export {};

declare global {
  namespace Express {

    // Extend Request
    // --------------
    interface Request {
      customer?: {
        isAccount: () => boolean;
      };
    }
  }
}
