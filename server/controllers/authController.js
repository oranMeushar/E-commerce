const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../util/sendEmail');
const getCookieToken = require('../util/getCookieToken');

const login = catchAsync(async(req, res, next) =>{
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide both email and password', 'Failed', 400));
    }
    const user = await User.findOne({email}).select('+password');
    
    if (!user || ! await user.isPassword(password, user.password)) {
        return next(new AppError('Invalid email or password', 'Failed', 400));
    }
    
    const {token, cookieOptions} = getCookieToken(user._id);
    user.password = undefined;
    res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json({
        status:'Success',
        message:'Successfully loggin',
        user,
        data:{
            token
        }
    });
});

const signup = catchAsync(async(req, res, next) =>{
    await User.init();
    const user = await User.create(req.body);

    user.__v = undefined;
    user.password = undefined;
    const {token, cookieOptions} = getCookieToken(user._id);
    
    res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json({
        status:'Success',
        message:'User was successfully created',
        user,
        data:{
            token
        }
    })
});

const forgotPassword = catchAsync(async(req, res, next) =>{
    const {email} = req.body;
    if (!email) {
        return next(new AppError('Please provide an email', 'Failed', 400));
    }
    const user = await User.findOne({email});

    if (!user) {
        return next(new AppError('Email was not found', 'Failed', 401));
    }

    const resetToken = await user.generateResetToken();
    const resetUrl = `${req.get('Origin')}/resetPassword/${resetToken}`;
    try {
        await sendEmail(email, resetUrl);
        res.status(200).json({
            status:'Success',
            message:'Please check your email for password reset',
        });
    } catch(err){
        user.passwordRestToken = undefined;
        user.passwordRestExpired = undefined;
        await user.save({validateBeforeSave:false});
        return next(new AppError('An error occured while sending the email', 'Failed', 500));//*500=server error
    }
});

const resetPassword = catchAsync(async(req, res, next) =>{
    const {resetToken} = req.params;
    const {password, passwordConfirm} = req.body;
    if (!resetToken) {
        return next(new AppError('Unauthorized', 'Failed', 401));
    }
    if (!password || !passwordConfirm) {
        return next(new AppError('Please provide password and password confirmation', 'Failed', 401));
    }
    const hashToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        passwordResetToken:hashToken,
        passwordResetExpired:{$gt:Date.now()}
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired','Failed', 400));
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;

    await user.save();
    
    res.status(200).json({
        status: 'Success',
        message:'Password was successfully changed'
    })
});

const isAuth = catchAsync(async(req, res, next) =>{
    const token = req.cookies.token;
    const user = req.user;
    user.password = undefined;
    res.status(200).json({
        status: 'Success',
        user,
        data:{
            token
        }
    })
});

const signout = catchAsync(async(req, res, next) =>{
    res
    .clearCookie('token')
    .status(200)
    .json({
        status:'Success',
        message:'Successfully logged out'
    })
});

module.exports.login = login;
module.exports.signup = signup;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;
module.exports.isAuth = isAuth;
module.exports.signout = signout;