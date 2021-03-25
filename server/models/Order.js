const mongoose = require('mongoose');
const dateformat = require('dateformat');

const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

function isEmpty(cart){
    return cart.length !== 0
}

const itemSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required: [true, 'Each item should have a name'],
        minLength:[2, 'The minimum length of a title is 2 characters'],
        maxLength:[30, 'The maximum length of a title is 30 characters']
    },
    category:{
        type: 'String',
        required: [true, 'Each item should have a category'],
        minLength:[2, 'The minimum length of a category is 2 characters'],
        maxLength:[30, 'The maximum length of a category is 30 characters']
    },
    type:{
        type: 'String',
        required: [true, 'Each item should have a type'],
        minLength:[2, 'The minimum length of a category is 2 characters'],
        maxLength:[30, 'The maximum length of a category is 30 characters']
    },
    price:{
        type: 'Number',
        required: [true, 'Item price is required'],
    },
    amount:{
        type: 'Number',
        required: [true, 'Item quantity is required'],
        min:1
    }
})

const orderSchema = new mongoose.Schema({
    items:{
        type:[itemSchema],
        required:true,
        validate:[isEmpty, 'Cart is Empty']
    },
    totalItems:{
        type:'Number',
        required:true
    },
    totalPrice:{
        type:'Number',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:'String',
        default:Date.now
    }
}, options)


orderSchema.pre('save', function(next) {
    const now = new Date();
    const formattedDate = dateformat(now, "mmmm dS yyyy");
    const formattedTime = dateformat(now,"HH:MM")
    this.createdAt = formattedDate + ', At ' + formattedTime;
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;