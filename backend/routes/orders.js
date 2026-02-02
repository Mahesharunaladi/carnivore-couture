const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create a new order
router.post('/', auth, async (req, res) => {
    try {
        console.log('Creating order for user:', req.user._id);
        console.log('Order data:', JSON.stringify(req.body, null, 2));
        
        const order = new Order({
            ...req.body,
            user: req.user._id
        });
        await order.save();
        
        console.log('Order created successfully:', order._id);
        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        res.status(400).json({ message: error.message });
    }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id,
            user: req.user._id 
        }).populate('items.product');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status;
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel order
router.patch('/:id/cancel', auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ message: 'Order cannot be cancelled' });
        }

        order.status = 'cancelled';
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
