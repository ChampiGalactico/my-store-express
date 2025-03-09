import { Router } from "express";
import ProductRoutes from './routes/productRoutes.js';

const ROOT = '/product';
const ROUTER = Router();

ROUTER.use(ROOT, ProductRoutes);

export default ROUTER;