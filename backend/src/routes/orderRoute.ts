import { Router } from "express";
import { createNewOrder, getOrder, listOrders } from "../controller/orderController";
import { validationData } from "../middleware/validationMiddleware";
import { createOrder, insertOrderWithItems } from "../validator/orderValidator";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router()

// this will validate the orders and its items
router.post('/neworder', verifyToken, validationData(insertOrderWithItems), createNewOrder)
router.get('/listorder',verifyToken, listOrders)
router.get('/', verifyToken, getOrder)

export default router