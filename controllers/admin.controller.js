import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

// assign agent to a customer
export const assignAgent = async (req, res, next) => {
    try {
        const { agent } = req.body;
        const { id } = req.params;

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new AppError("ticket not found", 409);
        }

        const userExist = await User.findOne({ _id: agent, role: 'agent' });
        if (!userExist) {
            throw new AppError("agent not found", 409);
        }

        ticket.agent = agent;
        await ticket.save()
        res.status(200).json({
            sucess: true,
            message: "agent assigned",
            data: ticket
        })

    } catch (err) {
        next(err)
    }
}


// view all agents
export const allAgents = async (req, res, next) => {

    try {
        const agents = await User.find({ role: "agent" });
        if (!agents) {
            throw new AppError("No agents found", 409);
        }
        return res.status(200).json({
            sucess: true,
            message: "agents fetched",
            count: agents.length,
            data: agents
        })
    } catch (err) {
        next(err)
    }
}

// view all customers
export const allCustomers = async (req, res, next) => {

    try {
        const customers = await User.find({ role: "customer" });
        if (!customers) {
            throw new AppError("No customer found", 409);
        }
        return res.status(200).json({
            sucess: true,
            message: "agents fetched",
            count: customers.length,
            data: customers
        })
    } catch (err) {
        next(err)
    }
}

//promote a customer to agent or admin
export const updateUser = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            throw new AppError("User not found", 409);
        }
        user.role = role;
        await user.save();
        res.status(200).json({
            sucess: true,
            message: "updated",
            data: user
        })

    } catch (err) {
        next(err)
    }
}

// view all tickets
export const allTickets = async (req, res, next) => {
    try {
        const tickets = await Ticket.find();
        return res.status(200).json({
            success: true,
            message: "All tickets fetched",
            count: tickets.length,
            data: tickets
        })
    } catch (err) {
        next(err)
    }
}