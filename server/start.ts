import 'dotenv/config'
import { createExpressApp, createExpressRoutes, startExpressApp } from './app'

const app = await createExpressApp();

createExpressRoutes(app);

startExpressApp(app);