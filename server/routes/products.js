import express from 'express';

import { getProducts, updateProducts, updateInventory, createProduct } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProducts);
router.put('/updateProducts', updateProducts);
router.put('/updateInventory', updateInventory);
router.post('/addProduct', createProduct);


export default router;