const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendVerificationEmail } = require('../utils/emailService');

// Register a new user
router.post('/register', async (req, res) => {
    console.log('Registration attempt:', req.body);
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const user = new User(userData);
        
        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        // Password will be automatically hashed by the pre-save middleware
        await user.save();
        
        // Generate JWT token (but user won't have full access until verified)
        const token = jwt.sign(
            { 
                userId: user._id,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        // Remove sensitive data from response
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.emailVerificationToken;
        
        // Send verification email
        sendVerificationEmail(user.email, user.name, verificationToken)
            .then(result => {
                if (result.success) {
                    console.log('Verification email sent successfully to:', user.email);
                } else {
                    console.log('Failed to send verification email:', result.error);
                }
            })
            .catch(err => {
                console.error('Error in email sending process:', err);
            });
        
        res.status(201).json({ 
            message: 'Registration successful. Please check your email to verify your account.',
            user: userResponse, 
            token,
            requiresVerification: true
        });
    } catch (error) {
        console.error('Registration error:', error);
        console.error('Stack trace:', error.stack);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(400).json({ 
            message: 'Registration failed', 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in. Check your inbox for the verification link.',
                requiresVerification: true,
                email: user.email
            });
        }
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.emailVerificationToken;
        
        res.json({ user: userResponse, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const userResponse = req.user.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        
        const userResponse = req.user.toObject();
        delete userResponse.password;
        
        res.json(userResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});module.exports = router;
