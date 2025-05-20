import {Router} from 'express'
import { createProducts, deleteProducts, getProducts, getProductsById, listProducts, updateProducts } from 'src/controller/products';
import { createProductSchema, updateProductSchema } from 'src/db/productsSchema';
import { verifySeller, verifyToken } from 'src/middleware/authMiddleware';
import { validationData } from 'src/middleware/validationMiddleware';

const router = Router();


router.get('/', getProducts)
router.post('/', verifyToken, verifySeller,validationData(createProductSchema), createProducts)
router.get('/products', listProducts)
router.get('/:id', getProductsById)
router.delete('/:id', verifyToken, verifySeller, deleteProducts)
router.put('/:id', verifyToken, verifySeller, validationData(updateProductSchema), updateProducts)

export default router;
