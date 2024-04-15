import express from "express";
import { accountRepository } from "./accountRepository";
import { signatureRepository } from "./signatureRepository";
const accountManagementRouter = express.Router();

accountManagementRouter.get('/check-email-exists', async (req, res) => {
    const retrievedAccount = await accountRepository.checkAccountExists(req.query.email);
    res.json(retrievedAccount);
});

accountManagementRouter.get('/get-account-by-email', async (req, res) => {
    const retrievedAccount = await accountRepository.getByEmail();
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