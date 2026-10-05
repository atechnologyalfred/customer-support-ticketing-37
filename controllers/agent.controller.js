//agents accessing all asigned customers
import Ticket from "../models/ticket.model.js"
import AppError from "../utils/AppError.js";

//view all assigned tickets
export const ticketsAssigned = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({ agent: req.user._id });
        return res.status(200).json({
            success: true,
            message: "tickets found",
            data: tickets
        })

    } catch (err) {
        next(err)
    }
};

//agent find and resolve ticket
export const resolvedTickets = async (req, res, next) => {
    try {
        const ticket = await Ticket.findOne({ agent: req.user._id, _id: req.params.id })
        if (!ticket) {
            throw new AppError("ticket not found", 404)
        }
        ticket.status = "resolved";
        await ticket.save();
        res.status(200).json({
            success: true,
            message: "ticket resolved",
            data: ticket
        })
    } catch (err) {
        next(err)
    }
}