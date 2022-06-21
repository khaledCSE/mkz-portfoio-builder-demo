import { Router } from 'express';
import { notFound } from '../controllers/auth.controller';
import { updateProfile } from '../controllers/profile.controller';
import { verifyToken } from '../middlewares/access-control.middleware';

const router = Router();

router.patch('/', verifyToken, updateProfile);
router.all('*', notFound);

export default router;
