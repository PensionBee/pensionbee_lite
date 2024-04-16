import express, { Request } from "express";
import { accountRepository } from "./accountRepository";
import { signatureRepository } from "./signatureRepository";
const accountManagementRouter = express.Router();

const parseEmail = (req: Request) => {
    let { email } = req.query;
    return typeof email === "string" ? email : '';
}

accountManagementRouter.get('/check-email-exists', async (req, res) => {
    const retrievedAccount = await accountRepository.checkAccountExists(parseEmail(req));
    res.json(retrievedAccount);
});

accountManagementRouter.get('/get-account-by-email', async (req, res) => {
    const retrievedAccount = await accountRepository.getByEmail(parseEmail(req));
    res.json(retrievedAccount);
});

accountManagementRouter.post('/create-account', async (req, res) => {
    const newAccount = await accountRepository.createAccount();
    res.json(newAccount);
});

accountManagementRouter.post('/update-account', async (req, res) => {
    const completedAccount = await accountRepository.completeAccount();
    const newSignature = await signatureRepository.createSignature();
    res.json({
        completedAccount,
        newSignature,
    });
});

export default accountManagementRouter;