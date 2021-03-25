const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const Product = require('../models/Product');

const productById = catchAsync(async(req, res, next) =>{
    const id = req.params.productId;
    const product = await Product.findById(id).select('+image');
    if (!product) {
        return next(new AppError('Product not found', 'Failed', 404));
    }
    req.product = product;
    next();
});

module.exports = productById