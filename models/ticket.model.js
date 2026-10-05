import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved", "closed"],
        default: "open"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
    },
    attachments: [{
        filename: String,
        url: String,
        mimetype: String,
    }]
},
    {
        timestamps: true,
    });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;