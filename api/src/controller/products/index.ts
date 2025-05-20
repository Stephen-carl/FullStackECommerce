
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../../db/index.js";
import { productsTable } from "../../db/productsSchema.js";

// sample code
export function getProducts(req: Request, res: Response) {
    res.send('I created a new response')
}

export async function createProducts(req: Request, res: Response) {

    try {
        console.log(req.userId);
        
        // write the orm query in a sql-like form
        // so i am going to create and return the just inserted data
        const [insertedProduct] = await db.insert(productsTable).values(req.cleanBody).returning()
    
        res.status(201).json(insertedProduct)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getProductsById(req: Request, res: Response) {
    try {
        const id = req.params.id
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)))
        if (!product) {
            res.status(404).send('Product not found')
        } else {
            res.status(200).json(product)
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error)
    }
}

export async function deleteProducts(req: Request, res: Response) {
    try {
        const id = req.params.id
        const [product] = await db.delete(productsTable).where(eq(productsTable.id, Number(id))).returning()
        if (product) {
            res.send(204)
        }else{
            res.status(404).send('Product not found')
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error)
    }
}

export async function updateProducts(req: Request, res: Response) {
    try {
        // get the id from the params, and the details from the body
        const id = req.params.id
        const updatedFields = req.cleanBody

        // update 
        const [product] = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id, Number(id) )).returning()

        if (product) {
            res.json(product)
        }else{
            res.status(404).send('Product not found')
        }
     } catch (error) {
        res.status(500).send(error)
    }
}