const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
            .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/\d/).withMessage('Password must contain a number')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain a special character'),
        body('address.street').optional().trim().isLength({ max: 100 }).withMessage('Street address too long'),
        body('address.city').optional().trim().isLength({ max: 50 }).withMessage('City name too long'),
        body('address.state').optional().trim().isLength({ max: 50 }).withMessage('State name too long'),
        body('address.zipCode').optional().trim().matches(/^\d{5}(-\d{4})?$/).withMessage('Invalid zip code format')
    ];
};

const productValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Product name is required')
            .isLength({ min: 3, max: 100 }).withMessage('Product name must be between 3 and 100 characters'),
        body('description')
            .trim()
            .notEmpty().withMessage('Description is required')
            .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ min: 0.01, max: 99999.99 })
            .withMessage('Price must be between 0.01 and 99,999.99'),
        body('category')
            .notEmpty().withMessage('Category is required')
            .isIn(['chicken', 'mutton', 'fish', 'seafood', 'eggs'])
            .withMessage('Invalid category'),
        body('stock')
            .notEmpty().withMessage('Stock is required')
            .isInt({ min: 0, max: 9999 })
            .withMessage('Stock must be between 0 and 9999'),
        body('weight')
            .trim()
            .notEmpty().withMessage('Weight is required')
            .matches(/^\d+(\.\d{1,2})?\s*(kg|g|lbs)$/)
            .withMessage('Weight must be in format: 0.00 kg/g/lbs'),
        body('imageUrl')
            .trim()
            .notEmpty().withMessage('Image URL is required')
            .isURL().withMessage('Valid image URL is required')
            .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
            .withMessage('Image URL must end with a valid image extension')
    ];
};

const orderValidationRules = () => {
    return [
        body('items')
            .notEmpty().withMessage('Order items are required')
            .isArray({ min: 1 }).withMessage('Order must contain at least one item'),
        body('items.*.product')
            .notEmpty().withMessage('Product ID is required')
            .isMongoId().withMessage('Valid product ID required'),
        body('items.*.quantity')
            .notEmpty().withMessage('Quantity is required')
            .isInt({ min: 1, max: 100 })
            .withMessage('Quantity must be between 1 and 100'),
        body('shippingAddress')
            .notEmpty().withMessage('Shipping address is required'),
        body('shippingAddress.street')
            .trim()
            .notEmpty().withMessage('Street is required')
            .isLength({ min: 5, max: 100 }).withMessage('Street address must be between 5 and 100 characters'),
        body('shippingAddress.city')
            .trim()
            .notEmpty().withMessage('City is required')
            .isLength({ min: 2, max: 50 }).withMessage('City name must be between 2 and 50 characters')
            .matches(/^[a-zA-Z\s]+$/).withMessage('City can only contain letters and spaces'),
        body('shippingAddress.state')
            .trim()
            .notEmpty().withMessage('State is required')
            .isLength({ min: 2, max: 50 }).withMessage('State name must be between 2 and 50 characters')
            .matches(/^[a-zA-Z\s]+$/).withMessage('State can only contain letters and spaces'),
        body('shippingAddress.zipCode')
            .trim()
            .notEmpty().withMessage('Zip code is required')
            .matches(/^\d{5}(-\d{4})?$/).withMessage('Invalid zip code format')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation Error',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    userValidationRules,
    productValidationRules,
    orderValidationRules,
    validate
};
