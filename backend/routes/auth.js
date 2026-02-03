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
        
        // Check if email service is configured
        const emailConfigured = process.env.EMAIL_USER && 
                               process.env.EMAIL_PASSWORD && 
                               process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                               process.env.EMAIL_PASSWORD !== 'your-app-password';
        
        if (emailConfigured) {
            // Generate email verification token only if email is configured
            const verificationToken = crypto.randomBytes(32).toString('hex');
            user.emailVerificationToken = verificationToken;
            user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        } else {
            // Skip verification if email is not configured (development mode)
            user.isEmailVerified = true;
            console.log('⚠️  Email service not configured - user registered without verification requirement');
        }
        
        // Password will be automatically hashed by the pre-save middleware
        await user.save();
        
        // Generate JWT token (but user won't have full access until verified if email is configured)
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
        
        // Send verification email only if configured
        if (emailConfigured && user.emailVerificationToken) {
            sendVerificationEmail(user.email, user.name, user.emailVerificationToken)
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
        }
        
        const responseMessage = emailConfigured 
            ? 'Registration successful. Please check your email to verify your account.'
            : 'Registration successful. You can now log in (email verification disabled in development mode).';
        
        res.status(201).json({ 
            message: responseMessage,
            user: userResponse, 
            token,
            requiresVerification: emailConfigured && !user.isEmailVerified
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
        
        // Check if email verification is enforced (only if email service is properly configured)
        const emailConfigured = process.env.EMAIL_USER && 
                               process.env.EMAIL_PASSWORD && 
                               process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                               process.env.EMAIL_PASSWORD !== 'your-app-password';
        
        if (!user.isEmailVerified && emailConfigured) {
            return res.status(403).json({ 
                message: 'Please verify your email before logging in. Check your inbox for the verification link.',
                requiresVerification: true,
                email: user.email
            });
        }
        
        // Allow login even without verification if email is not configured (development mode)
        if (!user.isEmailVerified && !emailConfigured) {
            console.log('⚠️  Email verification skipped - email service not configured');
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
        
        res.json({ 
            user: userResponse, 
            token,
            emailVerified: user.isEmailVerified,
            message: !user.isEmailVerified && !emailConfigured ? 
                'Logged in without email verification (development mode)' : undefined
        });
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
});

// Verify email
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid or expired verification token. Please request a new verification email.' 
            });
        }
        
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        
        // Send welcome email after verification
        sendWelcomeEmail(user.email, user.name)
            .then(result => {
                if (result.success) {
                    console.log('Welcome email sent successfully to:', user.email);
                }
            })
            .catch(err => {
                console.error('Error sending welcome email:', err);
            });
        
        res.json({ 
            message: 'Email verified successfully! You can now log in.',
            verified: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Check if email service is configured
        const emailConfigured = process.env.EMAIL_USER && 
                               process.env.EMAIL_PASSWORD && 
                               process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                               process.env.EMAIL_PASSWORD !== 'your-app-password';
        
        if (!emailConfigured) {
            return res.status(503).json({ 
                message: 'Email service is not configured. Please contact administrator or login without verification.',
                emailNotConfigured: true
            });
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }
        
        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await user.save();
        
        // Send verification email
        const result = await sendVerificationEmail(user.email, user.name, verificationToken);
        
        if (result.success) {
            res.json({ 
                message: 'Verification email sent successfully. Please check your inbox.' 
            });
        } else {
            res.status(500).json({ 
                message: 'Failed to send verification email. Please try again later.',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ 
            message: 'Server error while sending verification email.',
            error: error.message 
        });
    }
});

module.exports = router;
