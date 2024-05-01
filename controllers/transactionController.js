const { validationResult } = require('express-validator');
const { sendErrorRes, sendSuccessRes } = require('../helpers/response');
const { isValidTransactionType, getTransactionTypeCode, callThirdPartyAPI, getOrderId } = require('../helpers/transaction');
const { Transaction, sequelize } = require('../models');

const transaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorRes(res, 400, 'Validation failed', errors.array());
    }

    const user = req.user;
    const { amount } = req.body;
    const { transactionType } = req.params;
    const type = getTransactionTypeCode(transactionType);

    if (!isValidTransactionType(type)) {
        return sendErrorRes(res, 400, 'Invalid transaction type', `The transaction types are 'deposit' and 'withdraw'`);
    }

    const updatedAmount = transactionType === 'deposit' ? parseFloat(amount) : -parseFloat(amount);
    const totalAmount = parseFloat(user.total_amount) + updatedAmount;

    if (transactionType === 'deposit') {
        if (user.total_amount >= 10000000.00 || totalAmount > 10000000) {
            return sendErrorRes(res, 400, 'Deposit amount exceeds account balance limit', 'Maximum balance of your account is 10.000.000,00');
        }
    } else if (transactionType === 'withdraw') {
        if (user.total_amount <= 1.00 || totalAmount < 1.00) {
            return sendErrorRes(res, 400, 'Insufficient account balance for withdrawal', 'Minimum balance of your account is 1');
        }
    }

    const order_id = getOrderId(transactionType, user.id);
    const apiResponse = await callThirdPartyAPI(order_id, amount, new Date());
    if (apiResponse.data) {
        if (apiResponse.success) {
            const transaction = await Transaction.create({
                amount: apiResponse.data.amount,
                status: apiResponse.data.status,
                order_id: apiResponse.data.order_id,
                type,
                user_id: user.id
            });

            user.total_amount = totalAmount;
            await user.save();
    
            return sendSuccessRes(res, 201, [], `${transactionType} successful`)
        } else {
            const transaction = await Transaction.create({
                amount: amount,
                status: apiResponse.data.status,
                order_id: order_id,
                type,
                user_id: user.id
            });
    
            return sendErrorRes(res, 500, `Failed to process ${transactionType}`, apiResponse.data.message );
        }
    }

    return sendErrorRes(res, 500, `Failed to process ${transactionType}`, apiResponse.message );
  } catch (error) {
    console.log(error);
    return sendErrorRes(res, 500, 'Internal server error', error.message );
  }
};

const history = async (req, res) => {
    try {
        const user_id = req.user.id;
        const transactionHistory = await Transaction.findAll({
            where: { user_id },
            order: [['createdAt', 'Desc']] 
        });

        if (transactionHistory) {
            return sendSuccessRes(res, 201, transactionHistory, `Get transaction history successfully`)
        }

        return sendErrorRes(res, 404, 'Transaction history not found', [] );
    } catch (error) {
        console.log(error);
        return sendErrorRes(res, 500, 'Internal server error', error.message );
    }
}

module.exports = { 
    transaction ,
    history
};