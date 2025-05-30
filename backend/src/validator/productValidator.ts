import { z } from "zod";

export const createProd = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Product price is required"),
    image : z.string().optional(),
    quantity : z.number().min(1, "Product quantity is required"),
})

export const updateProd = z.object({
    description: z.string().optional(),
    price: z.number().optional(),
    image : z.string().optional(),
    quantity : z.number().optional(),
})