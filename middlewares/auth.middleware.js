import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from "../utils/AppError.js";

const protect = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.toLowerCase().startsWith("bearer")) {
            throw new AppError("No token", 401);
        }

        const token = auth.split(" ")[1];
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id);
        next()
    } catch (err) {
        next(err)
    }
}
export default protect;