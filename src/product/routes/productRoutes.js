import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.post("", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
router.get("/products", ProductController.getProducts);
router.get("/id/:id", ProductController.getProductById);
router.get("/category/:category", ProductController.getProductsByCategory);

export default router;