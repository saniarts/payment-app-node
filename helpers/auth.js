require('dotenv').config();
const jwt = require('jsonwebtoken');

const encodeToken = (token) => {
    return Buffer.from(token).toString('base64');
};

const decodeToken = (token) => {
    return Buffer.from(token, 'base64').toString('utf-8');
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
    try {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
          
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = { 
    generateToken, 
    verifyToken,
    encodeToken,
    decodeToken
 };