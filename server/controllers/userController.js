const getCookieToken = require('../util/getCookieToken');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/AppError');
const User = require('../models/User');

const filter = (reqBody, ...allowedFields) =>{
    let keys = Object.keys(reqBody);
    let result = {};
    allowedFields.forEach(field =>{
        if (keys.includes(field) && reqBody[field].toString().length !== 0){
            result[field] = reqBody[field];
        }
    })
    return result;
}

const getUser = catchAsync(async(req, res, next) => {
    const user = req.user;
    user.__v = undefined;
    user.updatedAt = undefined;
    user.password = undefined;
    res.status(200).json({
        status:'Success',
        data:user
    });
});

const updateUser = catchAsync(async(req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('Invalid update inputs', 'Faild', 400));
    }

    const filterdObj = filter({...req.body}, 'name', 'email');

    if (!Object.keys(filterdObj)[0]) {
        return next(new AppError('nothing to update', 'Faild', 400));
    }
    const options = {
       new:true,
       runValidators:true,
       context:'query' 
    }
    const updatedUser = await User
    .findByIdAndUpdate(req.user._id, filterdObj, options)
    .select('-__v -updatedAt')
    res.status(200).json({
        status:'Success',
        message:'Successfuly updated user',
        user:updatedUser
    });
});

const updatePassword = catchAsync(async(req, res, next) => {
    const user = req.user;
    const {oldPassword, newPassword, newPasswordConfirm} = req.body;
    if (!oldPassword) {
        return next(new AppError('Please provide old password', 'Failed', 400))
    }
    const isEqualPasswords = await user.isPassword(oldPassword, user.password);

    if (!isEqualPasswords) {
        return next(new AppError('incorrect old password', 'Failed', 401))
    }

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save();
    user.password = undefined;
    const {token, cookieOptions} = getCookieToken(user._id)
    res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json({
        status:'Success',
        message:'Password was successfuly changed',
        user,
        data:{
            token
        }
    });
});

module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.updatePassword = updatePassword;
