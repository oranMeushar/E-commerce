const mongoose = require('mongoose');
const validator = require('validator');
const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

const categorySchema = new mongoose.Schema({
    name:{
        type:'String',
        required:[true, 'Please provide a category name'],
        unique:true,
        minLength:[2, 'Category name must contain at least 2 characters'],
        maxLength:[40, 'Category name must contain at most 50 characters'],
    },
},options);

categorySchema.pre('save', function(next){
    this.name = validator.trim(this.name)
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

