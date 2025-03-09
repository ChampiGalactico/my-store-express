import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();
const ROOT = '/user';

router.get(`${ROOT}/all`, UserController.getUsers);
router.get(`${ROOT}/id/:id`, UserController.getUserById);
router.get(`${ROOT}/username/:username`, UserController.getUserByUsername);

export default router;
