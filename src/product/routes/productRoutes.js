import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();
const ROOT = '/product';

router.get(ROOT, ProductController.getProducts);
router.get(`${ROOT}/:id`, ProductController.getProductById);

export default router;