const { body } = require('express-validator');

const fakeApiValidator = [
    body('order_id').notEmpty().withMessage('Order id is required'),
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isDecimal({ decimal_digits: '2' }).withMessage('Invalid amount format')
];

module.exports = {
    fakeApiValidator,
};
