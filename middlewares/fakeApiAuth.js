require('dotenv').config();

const { decodeToken } = require('../helpers/auth');
const { sendErrorRes } = require('../helpers/response');

const fakeApi = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
    
        if (!token) {
            return sendErrorRes(res, 401, 'Authorization header is missing', []);
        }
    
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        if (decodeToken(token) != process.env.THIRD_PARTY_TOKEN) {
            return sendErrorRes(res, 401, 'Invalid token', []);
        }
        
        next();
    } catch (error) {
        console.log(error);
        sendErrorRes(res, 500, 'Internal Server Error', error.message);
    }
};

module.exports = fakeApi;