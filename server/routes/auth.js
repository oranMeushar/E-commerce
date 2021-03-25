const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protected = require('../middleware/protected');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:resetToken', authController.resetPassword);
router.get('/isAuth', protected, authController.isAuth);
router.get('/signout', protected, authController.signout);


module.exports = router;