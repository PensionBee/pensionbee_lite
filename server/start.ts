import 'dotenv/config'
import { createExpressApp, createExpressRoutes, startExpressApp } from './express/app'

const app = await createExpressApp();

createExpressRoutes(app);

startExpressApp(app);
