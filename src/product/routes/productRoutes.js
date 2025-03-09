import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.get("/all", ProductController.getProducts);
router.get("/id/:id", ProductController.getProductById);

export default router;