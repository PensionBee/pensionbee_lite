import express, { Express, Request, Response} from "express";
import { accountManagementRouter } from "@/api/contexts/accountManagement/interface";

const PORT = 3000;

const app: Express = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/", accountManagementRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})