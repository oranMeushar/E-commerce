const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const protected = require('../middleware/protected');

router.post('/', protected, orderController.postOrder);
router.get('/', protected, orderController.getOrders);
router.delete('/:orderId', protected, orderController.deleteOrder);
router.get('/:orderId', protected, orderController.getOrder);
module.exports = router;

