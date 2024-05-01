const express = require('express');
const { registerValidator, loginValidator } = require('../validators/authValidator')
const { register, login, logout } = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', authenticate, logout);

module.exports = router;