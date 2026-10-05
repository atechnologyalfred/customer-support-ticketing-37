import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';

//register function

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, dob, phone, email, password } = req.body;

        // if (!firstName, !lastName, !dob, !phone, !email, !password) {
        //     return res.status(400).json({ message: "All field required" })
        // }

        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new AppError('Email already registered', 409);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) {
            throw new AppError("Error occured during hashing", 400)
        }

        const user = await User.create({ firstName, lastName, dob, phone, email, password: hashPassword })

        if (!user) {
            throw new AppError("Error during registation", 400)
        }

        const userData = user.toObject();
        delete userData.password;

        return res.status(201).json({
            success: true,
            message: `${user.email} registered successfully`,
            data: userData
        })



    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Invalid email or password', 401);
        }

        if (user.status === 'suspended') {
            return res.status(400).json({
                success: false,
                message: "user has been suspended",
                data: user.status
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            data: userData
        });
    } catch (err) {
        next(err);
    }
};