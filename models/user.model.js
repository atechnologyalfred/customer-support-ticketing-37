import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [20, "Max length should be 20"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: [20, "Max length should be 20"]
    },
    dob: {
        type: String,
        required: [true, "Your date of birth is required"]
    },
    phone: {
        type: String,
        required: [true, "Your phone number is required"],
        maxlength: [14, "Number is too much"]
    },
    email: {
        type: String,
        required: [true, "Email is needed"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password too small"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "agent", "admin"],
        default: "customer"
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "pending", "suspended"],
        default: "active"
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
export default User;