const express = require('express');
const protected = require('../middleware/protected');
const restricted = require('../middleware/restricted');
const categoryById = require('../middleware/categoryById');

const router = express.Router();

const categoryController = require('../controllers/categoryController');


router.post('/', protected, restricted('admin'), categoryController.newCategory);


router.param('categoryId', categoryById);
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategory);
router.delete('/:categoryId',protected, restricted('admin'), categoryController.deleteCategory);
router.patch('/:categoryId',protected, restricted('admin'), categoryController.updateCategory);

module.exports = router;
