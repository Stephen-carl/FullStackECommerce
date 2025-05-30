import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import db from "../config/index";
import { productTable } from "../db/productSchema";

export async function createProduct(req: Request, res: Response) {
    try {
        // create the id
        const startOf2025 = new Date('2025-01-01T00:00:00Z');
        const now = new Date();
        const secondsSince2025 = Math.floor((now.getTime() - startOf2025.getTime()) / 1000);
        const pid = `${req.cleanBody.name}_${secondsSince2025.toString()}`;
        // add to the req.cleanbody
        req.cleanBody.pid = pid

        const [product] = await db.insert(productTable).values(req.cleanBody).returning()
        
        console.log(`=== Inserted product with ID: ${product.pid} with name ${product.name} ===`);
        
        res.status(201).json({message: 'success', product})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error ${error}`})
    }
}

export async function getAllProduct(req: Request, res: Response) {
    try {
        const [product] = await db.select().from(productTable)
        res.status(200).json({message: 'success', product})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error ${error}`})
    }
}

export async function getSingleProduct(req: Request, res: Response) {
    try {
        const pid = req.params.pid
        const [product] = await db.select().from(productTable).where(eq(productTable.pid, pid))
        res.status(200).json({message: 'success', product})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error ${error}`})
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const pid = req.params.pid
        await db.update(productTable).set(req.cleanBody).where(eq(productTable.pid, pid))
        const [theProduct] = await db.select().from(productTable).where(eq(productTable.pid, pid))
        console.log(`=== Updated product with ID: ${pid}. ===`);
        res.status(200).json({message: 'success', theProduct})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error ${error}`})
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const pid = req.params.pid
        await db.delete(productTable).where(eq(productTable.pid, pid))
        console.log(`=== Deleted product with ID: ${pid}. ===`);
        res.status(200).json({message: 'success'})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error ${error}`})
    }
}