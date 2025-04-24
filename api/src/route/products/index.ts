import {Router} from 'express'
import { createProducts, deleteProducts, getProducts, getProductsById, listProducts, updateProducts } from 'src/controller/products';
import { createProductSchema, updateProductSchema } from 'src/db/productsSchema';
import { validationData } from 'src/middleware/validationMiddleware';

const router = Router();


router.get('/', getProducts)
router.post('/', validationData(createProductSchema), createProducts)
router.get('/products', listProducts)
router.get('/:id', getProductsById)
router.delete('/:id', deleteProducts)
router.put('/:id', validationData(updateProductSchema), updateProducts)

export default router;
