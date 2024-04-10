import express from "express";
import { accountRepository } from "./accountRepository";
const accountManagementRouter = express.Router();

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
    res.json(completedAccount);
});

export default accountManagementRouter;