import { Router } from "express";
import UserRoutes from './routes/userRoutes.js';

const ROOT = '/user';
const ROUTER = Router();

ROUTER.use(ROOT, UserRoutes);

export default ROUTER;