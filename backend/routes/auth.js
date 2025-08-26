const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { userValidationRules, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', userValidationRules(), validate, async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user with sanitized data
        const userData = {
            name: req.body.name.trim(),
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            address: {
                street: req.body.address?.street?.trim(),
                city: req.body.address?.city?.trim(),
                state: req.body.address?.state?.trim(),
                zipCode: req.body.address?.zipCode?.trim()
            }
        };

        const user = new User(userData);
        
        // Password will be automatically hashed by the pre-save middleware
        await user.save();
        
        // Generate JWT token
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
        
        // Send welcome email (you can implement this later)
        // await sendWelcomeEmail(user.email, user.name);
        
        res.status(201).json({ 
            message: 'Registration successful',
            user: userResponse, 
            token 
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(400).json({ 
            message: 'Registration failed', 
            error: error.message 
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
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
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
