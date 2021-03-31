const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const protected = require('../middleware/protected');
const clearCache = require('../middleware/clearCache');

router.post('/', protected, clearCache, orderController.postOrder);
router.get('/', protected, orderController.getOrders);
router.delete('/:orderId', protected, clearCache, orderController.deleteOrder);
router.get('/:orderId', protected, orderController.getOrder);
module.exports = router;

