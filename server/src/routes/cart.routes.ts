import express from 'express';
import { addToCart } from '../controllers/cart.controllers';

const router = express.Router();

router.post('/api/cart', addToCart);

export default router;