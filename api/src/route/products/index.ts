import {Router} from 'express'
import { createProducts, deleteProducts, getProducts, getProductsById, listProducts, updateProducts } from '../../controller/products/index.js';
import { createProductSchema, updateProductSchema } from '../../db/productsSchema.js';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware.js';
import { validationData } from '../../middleware/validationMiddleware.js';

const router = Router();


router.get('/', getProducts)
router.post('/', verifyToken, verifySeller,validationData(createProductSchema), createProducts)
router.get('/products', listProducts)
router.get('/:id', getProductsById)
router.delete('/:id', verifyToken, verifySeller, deleteProducts)
router.put('/:id', verifyToken, verifySeller, validationData(updateProductSchema), updateProducts)

export default router;
