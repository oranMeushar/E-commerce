const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/errorController');
const cors = require('./middleware/cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const ordersRoute = require('./routes/orders');



const app = express();
dotenv.config({
    path:'./config/config.env'
});


app.use(express.json({
    limit:'50kb',
}));

app.use(cookieParser());
app.use(cors());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/orders', ordersRoute);
app.use(errorController);





(async()=>{
    const options = {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        poolSize:10,
        serverSelectionTimeoutMS:10000,
        socketTimeoutMS:45000
    }
    try{
        await mongoose.connect(process.env.CONNECT_MONGODB_LOCAL, options);
        console.log('Successfully connected to database');
    }
    catch(err){
        console.log('error occurred while trying to connect to database');
    }
})();


const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server starts on port${PORT}`);
});




