import express from "express"
import { createProduct, deleteProduct, getAllProduct, getSingleProduct } from "../controller/productController"
import { verifySeller, verifyToken } from "../middleware/authMiddleware"
import { validationData } from "../middleware/validationMiddleware"
import { createProd, updateProd } from "../validator/productValidator"

const router = express()

router.post('/newproduct', verifyToken, verifySeller, validationData(createProd), createProduct )
router.delete('/deleteproduct/:pid', verifyToken, verifySeller, deleteProduct)
router.put('/updateproduct/:pid', verifyToken, verifySeller, validationData(updateProd), createProduct)
router.get('/getproduct', getAllProduct)
router.get('/getproduct/:pid', getSingleProduct)

export default router