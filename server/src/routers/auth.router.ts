import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/access-control.middleware';

const router = Router();

router.get('/', verifyToken, authController.getUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.all('*', authController.notFound);

export default router;
