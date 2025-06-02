import { z } from "zod";

// since i don't want the user to input anything
export const createOrder = z.object({})

// this is just the expected items that should be collected from user
export const createOrderItem = z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1),
    price: z.number()
})

// this helps to tie each item with its order Id
// and use it in the validate data
export const insertOrderWithItems = z.object({
    order : createOrder,
    items: z.array(createOrderItem)
})

export const updateOrderItem = z.object({
    quantity: z.number().min(1)
})