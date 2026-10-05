import express from 'express';
import { ticketsAssigned, resolvedTickets } from '../controllers/agent.controller.js';
import protect from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
const agentRoute = express.Router();
agentRoute.get("/agent/tickets", protect, role("agent"), ticketsAssigned);
agentRoute.patch("/agent/ticket/:id", protect, role("agent"), resolvedTickets);

export default agentRoute;