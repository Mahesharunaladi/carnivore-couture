import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // Ensure this line exists

export default router;