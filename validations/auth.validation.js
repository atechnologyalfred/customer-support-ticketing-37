import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required').max(20),
    lastName: z.string().trim().min(1, 'Last name is required').max(20),
    dob: z.string().trim().min(1, 'Date of birth is required'),
    phone: z.string().trim().min(1, 'Phone number is required').max(14),
    email: z.string().trim().transform(value => value.toLowerCase()),
    password: z.string().min(4, 'Password must be at least 4 characters')
});

export const loginSchema = z.object({
    email: z.string().trim().transform(value => value.toLowerCase()),
    password: z.string().min(1, 'Password is required')
});
