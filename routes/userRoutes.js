const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect routes after this middleware
router.use(authController.protect);

router.get('/me', userController.getMe);
router.patch('/updatePassword', authController.updatePassword);

module.exports = router;
