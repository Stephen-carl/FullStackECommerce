import { Request, Response } from "express";
import db from "../config/index";
import { userTable } from "../db/userSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";


export async function register(req: Request, res: Response) {
    try {
        // hash password 
        const hashpassword = await bcrypt.hash(req.cleanBody.password, 10);
        req.cleanBody.password = hashpassword;
        // so i know i'm getting the req.cleanbody from the validation middleware
        const [user] = await db.insert(userTable).values(req.cleanBody).returning()
        
        const { password: _, ...userNoPass } = user
        res.status(201).json({ message: "success", userNoPass})
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Something went error ${error}`})   
    }
}

export async function login(req: Request, res: Response) {
    try {
        // get user
        const { email, password } = req.cleanBody
        const [user] = await db.select().from(userTable).where(eq(userTable.email, email));
        if (!user){
            res.status(404).json({message : `User not found`})
            return
        }
        // check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword){
            res.status(401).json({message : `Invalid Credentials`})
            return
        }
        // generate token
        // according to gpt, this is the safest way to delete paswword
        const { password: _, ...userNoPass } = user;
    
        // create a jwt and give to the user
        const token = jwt.sign({userId: userNoPass.id, role: userNoPass.role, email: userNoPass.email, name: `${userNoPass.firstname} ${userNoPass.lastname}`}, process.env.JWT_SECRET!, {expiresIn: '30D'})
        res.status(200).json({message: 'success', token, user: userNoPass})  
        return 
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Something went error ${error}`}) 
    }
}
