const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken } = require('../helpers/auth');
const { User } = require('../models'); 
const { sendSuccessRes, sendErrorRes } = require('../helpers/response');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorRes(res, 400, 'Validation failed', errors.array());
        }

        const { name, email, password } = req.body;

        const user = await User.findOne({ where: {email} });
        if (user) {
            return sendErrorRes(res, 400, 'Email address already in use', []);
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword });

        sendSuccessRes(res, 201, [], "User registered successfully")
    } catch (error) {
        sendErrorRes(res, 500, 'Internal Server Error', error.message);
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorRes(res, 400, 'Validation failed', errors.array());
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return sendErrorRes(res, 404, 'User not found', errors.array());
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return sendErrorRes(res, 401, 'Invalid password', []);
        }

        const token = generateToken(user.id);

        sendSuccessRes(res, 200, {token: token}, "Logged in successfully")
    } catch (error) {
        sendErrorRes(res, 500, 'Internal Server Error', error.message);
    }
};

// check middleware
const logout = (req, res) => { 
    sendSuccessRes(res, 200, [], "Logged out successfully")
};

module.exports = { 
    register, 
    login, 
    logout 
};
