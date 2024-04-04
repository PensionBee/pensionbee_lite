import express from "express";

import { setUpExpressRoutes } from "@/api/shared/interface/express/routes";
import { postAccountRouteDefinition } from "@/api/contexts/accountManagement/interface/routeDefinitions/postAccount.routeDefinition";

export const accountManagementRouter = express.Router();

const basePath = "/api/account-management";

const routeDefinitions = [
    // GET routes
    
    // POST routes
    postAccountRouteDefinition,
];

setUpExpressRoutes(accountManagementRouter, basePath, routeDefinitions);