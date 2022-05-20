const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:token', userController.resetPassword);

// Protect routes after this middleware
router.use(userController.protect);

router.patch('/updatePassword', userController.updatePassword);

module.exports = router;