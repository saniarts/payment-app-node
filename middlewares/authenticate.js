const { verifyToken } = require('../helpers/auth');
const { sendErrorRes } = require('../helpers/response');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
    
        if (!token) {
            return sendErrorRes(res, 401, 'Authorization header is missing', []);
        }
    
        const decoded = verifyToken(token);
    
        if (!decoded) {
            return sendErrorRes(res, 401, 'Invalid token', []);
        }
    
        req.decoded = decoded
        next();
    } catch (error) {
        sendErrorRes(res, 500, 'Internal Server Error', error.message);
    }
};

module.exports = authenticate;