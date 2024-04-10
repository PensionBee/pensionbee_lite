import 'dotenv/config'
import { createExpressApp, createExpressRoutes, startExpressApp } from './app'

const app = createExpressApp();

createExpressRoutes(app);

startExpressApp(app);