import express from 'express';
import { login, register } from '../controllers/auth-controller.js';
import validation from '../middlewares/validation.middleware.js';
import { loginSchema, registerSchema } from '../validations/auth.validation.js';

const authRouter = express.Router();

authRouter.post("/register", validation(registerSchema), register);
authRouter.post("/login", validation(loginSchema), login);

export default authRouter;