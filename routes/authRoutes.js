const express = require('express');
const { login, register, verifyOTP,resendOTP,logout,dashboard  } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/logout', logout);
router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;