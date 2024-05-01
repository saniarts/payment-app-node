const { verifyToken } = require('../helpers/auth');
const { sendErrorRes } = require('../helpers/response');
const { User } = require('../models'); 

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
    
        if (!token) {
            return sendErrorRes(res, 401, 'Authorization header is missing', []);
        }
    
        const decoded = verifyToken(token);
    
        if (!decoded) {
            return sendErrorRes(res, 401, 'Invalid token', []);
        }

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return sendErrorRes(res, 401, 'User not found', []);
        }
    
        req.user = user;
        next();
    } catch (error) {
        sendErrorRes(res, 500, 'Internal Server Error', error.message);
    }
};

module.exports = authenticate;