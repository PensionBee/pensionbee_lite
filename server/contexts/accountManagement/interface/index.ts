import express from "express";

import { setUpExpressRoutes } from "@/server/shared/interface/express/routes";
import { postAccountRouteDefinition } from "@/server/contexts/accountManagement/interface/routeDefinitions/postAccount.routeDefinition";

export const accountManagementRouter = express.Router();

const basePath = "/api/account-management";

const routeDefinitions = [
    // GET routes
    
    // POST routes
    postAccountRouteDefinition,
];

setUpExpressRoutes(accountManagementRouter, basePath, routeDefinitions);