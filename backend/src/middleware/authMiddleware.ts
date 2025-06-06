// verify the jwt and then verify if role is seller/admin
import { Request, Response , NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verifyToken(req:Request, res: Response, next: NextFunction){
    // get the token from the Authorization
    const token = req.header('Authorization')
    if (!token) {
        res.status(401).json({ message: 'Unauthorized'})
        return;     // exit
    }
    try {
        // decode the data
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        // check the type of decoded
        if (typeof decoded !== 'object' || !decoded) {
            res.status(401).json({ message: 'Unauthorized'})
            return;
        }
        console.log(decoded);
        req.userId = decoded.userId;
        // it initially went red bcus role was not in the global interface
        req.role = decoded.role
        req.email = decoded.email
        req.name = decoded.name
        next()
    } catch (error) { 
        res.status(401).json({ message: 'Unauthorized'})
    }
}

// for the seller
export function verifySeller(req:Request, res: Response, next: NextFunction){
    // get the token from the Authorization
    const role = req.role
    if (role !== 'admin') {
        res.status(401).json({ message: 'Unauthorized Seller'})
        return;     // exit
    }
    next();
}