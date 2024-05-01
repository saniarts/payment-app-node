const express = require('express');

// middleware
const authenticate = require('../middlewares/authenticate');
const fakeApiAuth = require('../middlewares/fakeApiAuth');

// validator
const { registerValidator, loginValidator } = require('../validators/authValidator')
const { transactionValidator } = require('../validators/transactionValidator');

// controller
const { register, login, logout } = require('../controllers/authController');
const { transaction, history } = require('../controllers/transactionController');
const { fakeApi } = require('../controllers/fakeApiController');
const { fakeApiValidator } = require('../validators/fakeApiValidator');


/* API ROUTE */
const router = express.Router();

//auth
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', authenticate, logout);


// transactions
router.post('/transactions/:transactionType', authenticate, transactionValidator, transaction);
router.get('/transactions/history', authenticate, history);

// fake third party
router.post('/fakeApi', fakeApiAuth, fakeApiValidator, fakeApi);

module.exports = router;