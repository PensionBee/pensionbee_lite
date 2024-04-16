import "dotenv/config";
import express, { Express } from "express";
import apiRouter from "./apiRouter";

const PORT = process.env.EXPRESS_PORT;

export const createExpressApp = () => {
    const app: Express = express();
    return app;
}

export const createExpressRoutes = (app: Express) => {
    app.use('/api', apiRouter);
}

export const startExpressApp = (app: Express) => {
    app.listen(PORT, () => {
        console.log('Server starting on port ' + PORT);
    });
}
