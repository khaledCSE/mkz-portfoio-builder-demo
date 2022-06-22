import { Router } from 'express';
import { notFound } from '../controllers/auth.controller';
import { getAllProfiles, getSingleProfile, updateProfile } from '../controllers/profile.controller';
import { verifyToken } from '../middlewares/access-control.middleware';

const router = Router();

router.get('/', getAllProfiles);
router.patch('/', verifyToken, updateProfile);
router.get('/:id', getSingleProfile);
router.all('*', notFound);

export default router;
