const express = require('express');

// middleware
const { authenticate} = require('../middlewares/authenticate');
const fakeApiAuth = require('../middlewares/fakeApiAuth');

// validator
const { updateNameValidator, updatePasswordValidator, updateEmailValidator } = require('../validators/userValidator');
const { registerValidator, loginValidator } = require('../validators/authValidator')
const { transactionValidator } = require('../validators/transactionValidator');
const { fakeApiValidator } = require('../validators/fakeApiValidator');

// controller
const { wallet, updateName, updatePassword, updateEmail } = require('../controllers/userController');
const { transaction, history } = require('../controllers/transactionController');
const { register, login, logout } = require('../controllers/authController');
const { fakeApi } = require('../controllers/fakeApiController');


/* API ROUTE */
const router = express.Router();

//auth
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', authenticate, logout);

// user
router.get('/wallet', authenticate, wallet);
router.put('/update/name', authenticate, updateNameValidator, updateName);
router.put('/update/email', authenticate, updateEmailValidator, updateEmail);
router.put('/update/password', authenticate, updatePasswordValidator, updatePassword);

// transactions
router.post('/transactions/:transactionType', authenticate, transactionValidator, transaction);
router.get('/transactions/history', authenticate, history);

// fake third party
router.post('/fakeApi', fakeApiAuth, fakeApiValidator, fakeApi);

module.exports = router;