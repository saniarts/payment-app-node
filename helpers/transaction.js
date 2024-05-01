require('dotenv').config();

const axios = require('axios');
const constants = require('../config/constant');
const moment = require('moment');
const { encodeToken } = require('./auth');

const callThirdPartyAPI = async (order_id, amount, timestamp) => {
    try {
        const token = encodeToken(process.env.THIRD_PARTY_TOKEN);
        const apiResponse = await axios.post('http://localhost:3000/api/fakeApi', {
            order_id,
            amount,
            timestamp
        }, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        if (apiResponse.data.status == 2) {
            return { success: false, data: apiResponse.data };
        }

        return { success: true, data: apiResponse.data };
    } catch (error) {
        return { message: 'Third-party API error:'+error.message };
    }
};

const getTransactionTypeCode = (transactionType) => {
    for (const code in constants.type) {
      if (constants.type.hasOwnProperty(code)) {
        const typeValue = constants.type[code].toLowerCase();
        if (typeValue === transactionType) {
          return parseInt(code);
        }
      }
    }
    return 0;
};

const isValidTransactionType = (type) => {
    const validTransactionTypes = Object.keys(constants.type).map(Number);
    return validTransactionTypes.includes(type);
};  

const getOrderId = (transactionType, userId) => {
    const type = transactionType === 'deposit' ? 'dp' : 'wd';
    const dateTime = moment().format('DDMMYY/HHmmss');

    const order_id = `${type}/${userId}/${dateTime}`
    return order_id;
};
module.exports = {
    isValidTransactionType,
    callThirdPartyAPI,
    getTransactionTypeCode,
    getOrderId
};