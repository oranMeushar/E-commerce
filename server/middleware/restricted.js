const AppError = require('../util/AppError');

const restricted = (...roles) =>{
    return (req, res, next) =>{
        const role = req.user.role;
        if (!roles.includes(role)) {
            return next(new AppError('Not Authorized', 'Failed', 403));
        }
        next();
    }
}

module.exports = restricted;