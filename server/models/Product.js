const mongoose = require('mongoose')
const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

const imageSchema = new mongoose.Schema({
    data:{
        type:'Buffer',
    },
    contentType:{
        type:'String',
    }
},{_id:false});

const productSchema = new mongoose.Schema({
    name:{
        type:'String',
        required:[true, 'Please provide a name'],
        minLength:[2, 'Name must contain at least 2 characters'],
        maxLength:[40, 'Name must contain at most 50 characters'],
    },
    description:{
        type:'String',
        required:[true, 'Please provide a description'],
        minLength:[6, 'Description must contain at least 6 characters'],
        maxLength:[1000, 'Description must contain at most 1000 characters'],
    },
    price:{
        type:'Number',
        required:[true, 'Please provide a price']
    },
    type:{
        type:'String',
        required:[true, 'Please provide product type'],
        minLength:[2, 'Product type must contain at least 2 characters'],
        maxLength:[20, 'Product type must contain at most 50 characters'],
    },
    category:{
        type:'String',
        required:[true, 'Please provide a category'],
        minLength:[2, 'Category name must contain at least 2 characters'],
        maxLength:[40, 'Category name must contain at most 50 characters'],
    },
    quantity:{
        type:'Number',
        min:[0, 'quantity must be greater or equal to 0'],
        required:[true, 'Please provide a quantity']
    },
    sold:{
        type:'Number',
        default:0,
    },
    image:{
        type:imageSchema,
        select:false
    },
    shipping:{
        type:Boolean,
        required:[true, 'Please provide if product is shippable']
    }
},options);




const Product = mongoose.model('Product', productSchema);

module.exports = Product;