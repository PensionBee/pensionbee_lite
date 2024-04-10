import express from "express";
import accountManagementRouter from "./account-management/accountManagementRouter";

const apiRouter = express.Router();

apiRouter.use('/account-management', accountManagementRouter);

export default apiRouter;