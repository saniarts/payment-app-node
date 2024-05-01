const { body } = require('express-validator');

const transactionValidator = [
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isDecimal({ decimal_digits: '2' }).withMessage('Invalid amount format'),
];

module.exports = {
    transactionValidator,
};
