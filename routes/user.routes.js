import express from 'express';
import { profile, editProfile, deactivateProfile } from '../controllers/user.contorller.js';
import protect from '../middlewares/auth.middleware.js';
const userRoute = express.Router();

userRoute.get("/profile", protect, profile);
userRoute.put("/edit-profile", protect, editProfile);
userRoute.delete("/deactivate-profile", protect, deactivateProfile);
export default userRoute;