import { login, register } from  "../controller/authController"

import Router from 'express'
import { loginSchema, signUpSchema }  from '../validator/authValidator'
import  { validationData }  from '../middleware/validationMiddleware'

const router = Router()

router.post('/register', validationData(signUpSchema), register)
router.post('/login', validationData(loginSchema), login)


export default router