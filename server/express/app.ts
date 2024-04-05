import express, { Express, Request, Response} from "express";

const PORT = process.env.EXPRESS_PORT;

export const createExpressApp = async () => {
    const app: Express = express();
    return app;
}

export const createExpressRoutes = (app: Express) => {

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!')
    })

    app.get('/test', (req: Request, res: Response) => {
        console.log('test ep hit');
    })

}

export const startExpressApp = (app: Express) => {
    app.listen(PORT, () => {
        console.log('Server starting on port ' + PORT);
    });
}
