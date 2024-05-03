const express = require('express');

/* WEB ROUTE */
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

//auth
router.get('/login', (req, res) => {
  res.render('auth/login');
});
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;