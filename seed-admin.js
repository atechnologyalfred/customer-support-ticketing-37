import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import mongoose from 'mongoose';
dotenv.config();
const { DB_CONNECTION, FIRSTNAME, LASTNAME, EMAIL, password, ROLE, DOB, PHONE } = process.env;

const seedAdmin = async (req, res, next) => {
    try {
        const mongoDB = await mongoose.connect(DB_CONNECTION);
        if (mongoDB) {
            console.log("mongodb connected successfully");
        }
        const adminExist = await User.findOne({ email: EMAIL });
        if (adminExist) {
            console.log("email already exist and used by admin")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const admin = await User.create({ firstName: FIRSTNAME, lastName: LASTNAME, email: EMAIL, password: hashPassword, role: ROLE, dob: DOB, phone: PHONE });
        console.log("admin created", admin.email)
    } catch (err) {
        console.error(err.message)
        process.exit(1);
    }
}
seedAdmin()


