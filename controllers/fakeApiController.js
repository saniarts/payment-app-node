const { validationResult } = require('express-validator');
const { sendErrorRes, sendSuccessRes } = require('../helpers/response');

const fakeApi = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorRes(res, 400, 'Validation failed', errors.array());
    }

    let { order_id, amount } = req.body;

    const data = {
        order_id: order_id,
        amount: amount,
        status: 1
    };

    return res.status(200).json(data);
  } catch (error) {
    const data = {
        status: 2,
        message: error.message
    };
    return res.status(500).json(data);
  }
};

module.exports = { 
    fakeApi 
};
