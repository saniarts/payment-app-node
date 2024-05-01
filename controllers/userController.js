const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sendErrorRes, sendSuccessRes } = require('../helpers/response');
const { User } = require('../models');

const wallet = async (req, res) => {
    try {
        const user = req.user;
        return sendSuccessRes(res, 200, user, `Get user wallet successfully`)
    } catch (error) {
        console.log(error);
        return sendErrorRes(res, 500, 'Internal server error', error.message );
    }
}

const updateName = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendErrorRes(res, 400, 'Validation failed', errors.array());
    }

    const user = req.user;
    const { name } = req.body;

    user.name = name;
    await user.save();

    return sendSuccessRes(res, 200, user, `Name updated successfully`)
  } catch (error) {
    console.error(error);
    return sendErrorRes(res, 500, 'Internal server error', error.message );
  }
};

const updateEmail = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorRes(res, 400, 'Validation failed', errors.array());
        }
    
        const user = req.user;
        const { email } = req.body;

        if (email === user.email) {
            return sendErrorRes(res, 400, 'This is your current email', []);
        }
        
        const existingUser = await User.findOne({ where: {email} });
        if (existingUser) {
            return sendErrorRes(res, 400, 'Email address already in use', []);
        }

        user.email = email;
        await user.save();
    
        return sendSuccessRes(res, 200, user, `Email updated successfully`)
    } catch (error) {
        console.error(error);
        return sendErrorRes(res, 500, 'Internal server error', error.message );
    }
};

const updatePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorRes(res, 400, 'Validation failed', errors.array());
        }
    
        const user = req.user;
        const { password } = req.body;
        
        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        await user.save();
    
        return sendSuccessRes(res, 200, user, `Password updated successfully`)
    } catch (error) {
        console.error(error);
        return sendErrorRes(res, 500, 'Internal server error', error.message );
    }
};

module.exports = { 
    wallet,
    updateName,
    updateEmail,
    updatePassword,
};