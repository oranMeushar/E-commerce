const catchAsync = require('../util/catchAsync');
const Category = require('../models/Category');


const newCategory = catchAsync(async(req, res, next) =>{
    await Category.init();
    const category = await Category.create(req.body);
    
    res.status(200).json({
        status:'Success',
        message:'Category created successfully',
        data:category
    })    
});

const getCategory = catchAsync(async(req, res, next) =>{
    res.status(200).json({
        status:'Success',
        data:req.category
    });   
});


const deleteCategory = catchAsync(async(req,res,next) => {
    const category = req.category;
    await category.remove();

    res.status(200).json({
        status:'Success',
        message:'category deleted successfully'
    });
});


const updateCategory = catchAsync(async(req, res, next) =>{
    let category = req.category;
    category.name = req.body.name;

    await category.save();
    res.status(200).json({
        status:'Success',
        data:category
    })  
});
const getCategories = catchAsync(async(req, res, next) =>{
    const categories = await Category.find();
    res.status(200).json({
        status:'Success',
        data:categories
    })  
});


module.exports.newCategory = newCategory;
module.exports.getCategory = getCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.updateCategory = updateCategory;
module.exports.getCategories = getCategories;