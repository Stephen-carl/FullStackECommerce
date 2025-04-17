import { Request, Response } from "express";

// sample code
export function getProducts(req: Request, res: Response) {
    res.send('I created a new response')
}