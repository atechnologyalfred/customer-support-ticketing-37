
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
//user profile

export const profile = async (req, res, next) => {
    try {
        return res.json(req.user);
    } catch (err) {
        next(err)
    }
}

//edit profile

export const editProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, dob } = req.body;

        const findUser = await User.findById(req.user._id);
        if (!findUser) {
            throw new AppError("user not found", '409');
        }

        findUser.firstName = firstName
        findUser.lastName = lastName
        findUser.email = email;

        findUser.dob = dob
        findUser.phone = phone

        await findUser.save();

        res.status(500).json({
            success: true,
            message: "user updated successfully",
            data: findUser
        })

    } catch (err) {
        next(err)
    }
}


//deactivate profile

export const deactivateProfile = async (req, res, next) => {
    try {
        const profileExist = await User.findOne({ _id: req.user._id, status: "active" });
        if (!profileExist) {
            throw new AppError("user not found", 400)
        }

        if (profileExist.role === "admin") {
            throw new AppError("can't suspend admin", 401);
        }

        profileExist.status = "suspended";

        await profileExist.save()
        return res.status(200).json({
            success: true,
            message: "user suspended",
            data: profileExist
        })
    } catch (err) {
        next(err)
    }
}


//delete account 