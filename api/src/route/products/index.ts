import {Router} from 'express'
import { createProducts, deleteProducts, getProducts, getProductsById, listProducts, updateProducts } from 'src/controller/products';

const router = Router();


router.get('/', getProducts)
router.post('/', createProducts)
router.get('/products', listProducts)
router.get('/:id', getProductsById)
router.delete('/:id', deleteProducts)
router.put('/:id', updateProducts)

export default router;
