import express from 'express';
import { registerUser, getUserProfile, updateUserProfile, loginUser } from '../controllers/userController';
import auth from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, upload.single('profilePicture'), updateUserProfile);

export default router;
