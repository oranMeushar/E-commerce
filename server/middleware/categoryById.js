const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const Category = require('../models/Category');

const categoryById = catchAsync(async(req, res, next) =>{
    const id = req.params.categoryId;
    const category = await Category.findById(id);
    if (!category) {
        return next(new AppError('Category does not exist', 'Failed', 404));
    }
    req.category = category;
    next();
});

module.exports = categoryById;