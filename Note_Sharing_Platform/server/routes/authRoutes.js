const express = require('express');
const router = express.Router();
const { signup, login, logout, getMe, forgotPassword, resetPassword, verifyEmail, resendCode } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-code', resendCode);

module.exports = router;
