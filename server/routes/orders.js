import express from 'express';

import { createOrder, allOrders, getUserOrders,  } from '../controllers/orders.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/allOrders', allOrders);
router.get('/', getUserOrders);
export default router;