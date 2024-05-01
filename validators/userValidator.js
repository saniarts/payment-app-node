const { body } = require('express-validator');

const updateEmailValidator = [
    body('email').isEmail().withMessage('Invalid email format'),
];

const updateNameValidator = [
    body('name').notEmpty().withMessage('Name is required'),
];

const updatePasswordValidator = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = {
    updateEmailValidator,
    updateNameValidator,
    updatePasswordValidator
};
