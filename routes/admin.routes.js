import express from 'express';
import role from '../middlewares/role.middleware.js';
import protect from '../middlewares/auth.middleware.js';
import { allTickets, assignAgent, allCustomers, allAgents, updateUser } from '../controllers/admin.controller.js';

const adminRoute = express.Router();

adminRoute.get('/admin/tickets', protect, role("admin"), allTickets);
adminRoute.patch('/admin/assign-agent/:id', protect, role("admin"), assignAgent);
adminRoute.get('/admin/all-agents', protect, role("admin"), allAgents);
adminRoute.get('/admin/all-customers', protect, role("admin"), allCustomers);
adminRoute.patch('/admin/user/:id', protect, role("admin"), updateUser);

export default adminRoute;
