const express = require('express');
const protected = require('../middleware/protected');
const restricted = require('../middleware/restricted');
const productById = require('../middleware/productById');
const handleQuery = require('../middleware/handleQuery');
const Product = require('../models/Product');
const router = express.Router();

const productController = require('../controllers/productController');

router.param('productId', productById);
router.get('/categories',productController.listCategories);
router.get('/image/:productId',productController.getImage); 
router.get('/:productId',  productController.getProduct);
router.get('/', handleQuery(Product), productController.getProducts);
router.get('/related/:productId',productController.getRelated);
router.patch('/:productId',protected, restricted('admin'), productController.updateProduct);
router.post('/',protected, restricted('admin'), productController.newProduct);
router.delete('/:productId',protected, restricted('admin'), productController.deleteProduct);



module.exports = router;
