require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (userId, userEmail, userName) => {
    return jwt.sign({ id: userId, email: userEmail, name: userName }, process.env.JWT_SECRET, { expiresIn: '1d' });
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

module.exports = { generateToken, verifyToken };