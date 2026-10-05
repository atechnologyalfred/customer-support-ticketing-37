import express from 'express';
import { createTicket, viewTickets, viewTicket, editTicket } from '../controllers/ticket.controller.js';
import protect from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';

const ticketRoute = express.Router();

ticketRoute.post("/create-ticket", protect, role("customer"), createTicket);
ticketRoute.get("/view-tickets", protect, role("customer"), viewTickets);
ticketRoute.get("/view-ticket/:id", protect, role("customer"), viewTicket);
ticketRoute.patch("/edit-ticket/:id", protect, role("customer"), editTicket);
export default ticketRoute;