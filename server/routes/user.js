const express = require('express');
const userController = require('../controllers/userController');
const protected = require('../middleware/protected');
const router = express.Router()


router.get('/:userId', protected, userController.getUser);
router.patch('/password', protected, userController.updatePassword);
router.patch('/', protected, userController.updateUser);


module.exports = router;