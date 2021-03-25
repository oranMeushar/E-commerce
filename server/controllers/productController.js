const formidable = require('formidable');
const fs = require('fs');
const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const Product = require('../models/Product');

const isImage = (image) => {
    const position = image.name.lastIndexOf('.');
    const extention = image.name.slice(position, image.name.length).toLowerCase();
    return extention === '.jpg' || extention === '.png' || extention === '.jpeg'
}

const shuffle = (array) =>{
    array.sort(()=>Math.random() - 0.5);
}


const newProduct = catchAsync(async(req, res, next) =>{
    const options = {
        keepExtensions: true,
        maxFileSize:4 * 1024 * 1024, //4MB
        maxFields:8,
    }
    let form = formidable(options);

    form.parse(req,async(err, fields, files) => {
        if (err) {
          return next(new AppError(err.message, 'Failed', 400));
        }
        let product = new Product(fields);
        if (files.image && isImage(files.image)) {
            /* product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type */
            product.image = {
                data:fs.readFileSync(files.image.path),
                contentType:files.image.type
            }
        }
        else{
            return next(new AppError('Please provide an image', 'Failed', 400));
        }
        try{
            await product.save();
            res.status(200).json({
                status:'Success',
                message:'Product was successfully created',
                data:product
            })
        }catch(err){
            return next(new AppError(err.message, 'Failed', 400));
        }
    });
});

const getProduct = catchAsync(async(req,res,next) => {
    res.status(200).json({
        status:'Success',
        data:req.product
    });
});

const getProducts = catchAsync(async(req,res,next) => {
    res.status(200).json({
        status:'Success',
        data:{
            quantity:req.data.length,
            pagination:req.pagination,
            products:req.data
        }
    });
});

const deleteProduct = catchAsync(async(req,res,next) => {
    const product = req.product;
    await product.remove();
    res.status(200).json({
        status:'Success',
        message:'Product deleted successfully'
    });
});

const updateProduct = catchAsync(async(req, res, next) =>{
    const options = {
        keepExtensions: true,
        maxFileSize:4 * 1024 * 1024, //4MB
        maxFields:8,
    }
    let form = formidable(options);

    form.parse(req,async(err, fields, files) => {
        if (err) {
          return next(new AppError(err.message, 'Failed', 400));
        }

        let product = req.product;
        for (const key in fields) {
            product[key] = fields[key];
        }
        if (files.image && isImage(files.image)) {
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type
        }
        else{
            return next(new AppError('Please provide an image', 'Failed', 400));
        }
        try{
            await product.save();
            res.status(200).json({
                status:'Success',
                data:product
            })
        }catch(err){
            return next(new AppError('Failed to create product please try again', 'Failed', 400));
        }
    });
});

const getRelated = catchAsync(async(req, res, next) =>{
    const category = req.product.category;
    const type = req.product.type;
    const limit = 5;
    const relatedDocs = await Product.find({_id:{$ne:req.product._id},category, type}).limit(limit);
    shuffle(relatedDocs)
    res.status(200).json({
        status:'Success',
        data:{
            quantity:relatedDocs.length,
            relatedDocs
        }
    })
})

//! i dont understand the purpose of this
const listCategories = catchAsync(async(req, res, next) =>{
    const categories = await Product.distinct('category', {});
    res.status(200).json({
        status:'Success',
        data:{
            categories
        }
    })
})


const getImage = catchAsync(async(req, res, next) =>{
    const product = req.product;
    res.setHeader('Content-Type', product.image.contentType)
    res.send(product.image.data);
});

module.exports.newProduct = newProduct;
module.exports.getProduct = getProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.getProducts = getProducts;
module.exports.getRelated = getRelated;
module.exports.listCategories = listCategories;
module.exports.getImage = getImage;