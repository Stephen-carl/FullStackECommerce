import { Request, Response } from "express";
import db from "../config";
import { orderItemsTable, ordersTable } from "../db/ordersSchema";
import { eq, sql } from "drizzle-orm";


export async function createNewOrder(req : Request, res: Response) {
    try {
        // collect the order and items from the cleanbody
        // order should be empty sha, 
        const { orders, items } = req.cleanBody
        console.log(req.cleanBody);
        const userId = req.userId
        if (!userId) {
            res.status(400).json({ message: "Invalid order data" })
            return
        }
        const [neworder] = await db.insert(ordersTable).values({ userId : userId }).returning()

        // TODO: validate products Ids and take their actual price form db
        // i have to loop through the items and insert in the table
        const orderItems = items.map((item : any) => ({
            ...item,
            orderId : neworder.oid
        }))

        // now add to order item
        const neworderItems = await db.insert(orderItemsTable).values(orderItems).returning()
        console.log(`=== New Order ${neworder.oid} inserted by user ${userId} ===`);

        res.status(201).json({ message : "success", ...neworder,items : neworderItems})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});   
    }
}

// listing orders 
export async function listOrders(req : Request, res: Response) {
    try {
        const role = req.role
        const userId = req.userId
        if (!role || !userId) {
            res.status(400).json({ message: "Invalid user data" })
            return
        }

        let orders;
        if (role === 'user') {
            orders = await db.execute(
                sql`
                    SELECT
                    o.oid           AS "orderId",
                    o.created_at    AS "createdAt",
                    oi.oiid         AS "itemId",
                    oi.product_id   AS "productId",
                    oi.quantity     AS "quantity",
                    oi.price_per_unit AS "pricePerUnit",
                    oi.price_per_unit * oi.quantity AS "totalPrice"
                    FROM orders o
                    LEFT JOIN order_items oi
                    ON oi.order_id = o.oid
                    WHERE o.user_id = ${userId}
                `
            );
        }

        orders = await db.execute(
                sql`
                    SELECT
                    o.oid           AS "orderId",
                    o.created_at    AS "createdAt",
                    oi.oiid         AS "itemId",
                    oi.product_id   AS "productId",
                    oi.quantity     AS "quantity",
                    oi.price_per_unit AS "pricePerUnit",
                    oi.price_per_unit * oi.quantity AS "totalPrice"
                    FROM orders o
                    LEFT JOIN order_items oi
                    ON oi.order_id = o.oid
                `
            );
            const order = [orders][0].rows
        res.status(200).json({orders: order})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});   
    }
}

// to get a particular order
export async function getOrder(req: Request, res : Response) {
    try {
        const id = req.query.id
        if (!id) {
            res.status(400).json({ message: "Invalid order data" })
            return
        }

        const orders = await db.execute(sql`
                    SELECT
                    o.oid           AS "orderId",
                    o.created_at    AS "createdAt",
                    oi.oiid         AS "itemId",
                    oi.product_id   AS "productId",
                    oi.quantity     AS "quantity",
                    oi.price_per_unit AS "pricePerUnit",
                    oi.price_per_unit * oi.quantity AS "totalPrice"
                    FROM orders o
                    LEFT JOIN order_items oi
                    ON oi.order_id = o.oid
                    WHERE o.oid = ${id}
                `
            )
            const order = [orders][0].rows
            console.log(`=== Order ${id} fetched ===`);
            
            res.status(200).json({orders: order})
            return
    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
}