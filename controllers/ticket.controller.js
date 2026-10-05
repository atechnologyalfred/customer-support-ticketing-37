import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";


//user creates ticket (only customer)

export const createTicket = async (req, res, next) => {
    try {
        const { title, description, status, priority } = req.body;

        const ticket = await Ticket.create({ title, description, status, priority, customer: req.user._id })

        res.status(201).json({
            success: true,
            message: "Ticket created",
            data: ticket
        })

    } catch (err) {
        next(err)
    }
}

//user view ticket (customers only)
export const viewTickets = async (req, res, next) => {
    try {

        const tickets = await Ticket.find({ customer: req.user._id });
        if (!tickets) {
            throw new AppError("No ticket found", 409);
        }
        return res.status(200).json({
            sucess: true,
            message: "ticket fetched",
            count: tickets.length,
            data: tickets
        })

    } catch (err) {
        next(err)
    }
}

//view one tickets (customer only)
export const viewTicket = async (req, res, next) => {
    try {

        const ticket = await Ticket.findOne({ customer: req.user._id, _id: req.params.id });
        if (!ticket) {
            throw new AppError("Ticket not found", 409);
        }
        return res.status(200).json({
            sucess: true,
            message: "ticked fetched",
            data: ticket
        })

    } catch (err) {
        next(err)
    }
}

//edit ticket (customer)
export const editTicket = async (req, res, next) => {
    const { title, description, status, priority } = req.body;
    try {
        const ticket = await Ticket.findOneAndUpdate({ customer: req.user._id, _id: req.params.id }, { title, description, status, priority }, { returnDocument: 'after', runValidators: true });
        if (!ticket) {
            throw new AppError("Tikcet not found", 409);
        }
        return res.status(200).json({
            sucess: true,
            message: "ticket updated",
            data: ticket
        })
    } catch (err) {
        next(err)
    }
}

