import { Router } from "express";
import { createNewOrder, deleteOrderItem, getOrder, listOrders, updateOrderItem } from "../controller/orderController";
import { validationData } from "../middleware/validationMiddleware";
import { createOrder, insertOrderWithItems } from "../validator/orderValidator";
import { verifyToken } from "../middleware/authMiddleware";
const router = Router()

// this will validate the orders and its items
router.post('/neworder', verifyToken, validationData(insertOrderWithItems), createNewOrder)
router.get('/listorder',verifyToken, listOrders)
router.get('/', verifyToken, getOrder)
router.put('/updateorder/:id', verifyToken, updateOrderItem)
router.delete('/deleteorder/:id', verifyToken, deleteOrderItem)

export default router