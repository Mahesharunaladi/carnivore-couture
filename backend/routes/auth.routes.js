import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // Should be mounted under /api/auth
router.get('/me', protect, getMe); // Ensure this line exists

router.post('/register', (req, res) => {
  try {
    registerUser(req, res);
  } catch (error) {
    console.error('Registration error:', error); // Log full error for debugging
    const message = error.name === 'ValidationError' ? 'Invalid user data' : 'Server error during registration';
    res.status(500).json({ message, error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

export default router;