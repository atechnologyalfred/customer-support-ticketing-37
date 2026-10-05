import AppError from "../utils/AppError.js";
const role = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError("you are not authorized", 403);
        }
        next()
    }
}
export default role;