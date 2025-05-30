import { z } from "zod" 


export const signUpSchema = z.object({
    firstname: z.string().min(1, 'First name is required'),   // this ensures i get a value
    lastname: z.string().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    address: z.string().optional(),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
    role: z.string().optional()
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters')
})
