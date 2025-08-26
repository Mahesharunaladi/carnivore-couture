const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').trim().isEmail().withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
        body('address.street').optional().trim(),
        body('address.city').optional().trim(),
        body('address.state').optional().trim(),
        body('address.zipCode').optional().trim()
    ];
};

const productValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('price')
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number'),
        body('category')
            .isIn(['chicken', 'mutton', 'fish', 'seafood', 'eggs'])
            .withMessage('Invalid category'),
        body('stock')
            .isInt({ min: 0 })
            .withMessage('Stock must be a positive number'),
        body('weight').trim().notEmpty().withMessage('Weight is required'),
        body('imageUrl').trim().isURL().withMessage('Valid image URL is required')
    ];
};

const orderValidationRules = () => {
    return [
        body('items').isArray().withMessage('Items must be an array'),
        body('items.*.product').isMongoId().withMessage('Valid product ID required'),
        body('items.*.quantity')
            .isInt({ min: 1 })
            .withMessage('Quantity must be at least 1'),
        body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
        body('shippingAddress.street').trim().notEmpty().withMessage('Street is required'),
        body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
        body('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
        body('shippingAddress.zipCode').trim().notEmpty().withMessage('Zip code is required')
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
