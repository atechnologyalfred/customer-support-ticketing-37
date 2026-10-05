import AppError from "../utils/AppError.js";

const errorHandler = async (err, req, res, next) => {

    //validation error

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(error => ({
            path: error.path,
            message: error.message
        }))
        return res.status(400).json(...errors)
    }

    //Throw new AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        })
    }

    //duplicate error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            field: err.keyValue[field],
            message: `${field} already exist`
        })
    }

    //cast error

    if (err.name === 'castError') {
        return res.status(400).json({
            success: false,
            field: err.path,
            message: err.message
        })
    }

    //token error
    if (err.name === "JsonWebTokenError") {
        return res.status(400).json({
            sucess: false,
            message: "Invalid token",
            data: null
        })
    }

    if (err.name == "TokenExpiredError") {
        return res.status(400).json({
            sucess: false,
            message: "JWT token expired",
            data: null
        })
    }

    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" })


}

export default errorHandler;