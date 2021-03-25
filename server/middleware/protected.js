const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protected = catchAsync(async(req, res, next) =>{
    const token = req.cookies.token;
    if (!token) {
        return next(new AppError('Please login to get access', 'Failed', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 
    if (!decoded) {
        return next(new AppError('Not authenticated', 'Failed', 401));
    }
    const user = await User.findOne({_id:decoded.userId}).select('+password');
    if (!user) {
        return next(new AppError('User with this token is no longer exists', 'Failed', 401));    
    }

    req.user = user
    next();
});

module.exports = protected;



/* const jwt = require('express-jwt');

const protected = () => {
    return jwt({
        secret:process.env.JWT_SECRET,
        algorithms: ['RSa256']
    });
};
module.exports = protected; */


