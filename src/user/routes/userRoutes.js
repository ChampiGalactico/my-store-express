import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();

router.post('', UserController.createUser);
router.patch('/update/username/:id', UserController.updateUsername);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/users', UserController.getUsers);
router.get('/id/:id', UserController.getUserById);
router.get('/username/:username', UserController.getUserByUsername);

export default router;
