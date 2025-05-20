import { Request, Response, Router } from "express";
import { createUsersSchema, loginSchema, usersTable } from "src/db/userSchema";
import { validationData } from "src/middleware/validationMiddleware";
import bcrypt from 'bcryptjs'
import db from "src/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router()

// log and sign up
// validate the date of the schema
router.post('/register',validationData(createUsersSchema), async(req: Request, res: Response) =>{
    try {
        // encrypt paswword
        const hashedPassword = await bcrypt.hash(req.cleanBody.password, 10)
        req.cleanBody.password = hashedPassword
    
        // insert into database
        const [user] = await db.insert(usersTable).values(req.cleanBody).returning()
        // remove password from the data sent
        const { password: _, ...userWithoutPassword } = user;
    
        res.status(201).json({userWithoutPassword})
    } catch (error) {
        // server error
        res.status(500).send(error )
    }
    
})

router.post('/login', validationData(loginSchema), async(req:Request, res:Response) =>{
    try {
        // just get the email and password
        const { email, password } = req.cleanBody

        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if (!user) {
            res.status(404).send('Authentication failed')  
        }
        // hash the password and compare password
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) {
            res.status(404).send('Authentication failed')  
        } 

        // according to gpt, this is the safest way to delete paswword
        const { password: _, ...userWithoutPassword } = user;
    

        // create a jwt and give to the user
        const token = jwt.sign({userId: userWithoutPassword.id, role: userWithoutPassword.role}, process.env.JWT_STRING!, {expiresIn: '1h'})

        // send the login details
        res.status(200).json({user: userWithoutPassword, token})
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router