const catchAsync = require('../util/catchAsync');
const {clearCache} = require('../util/cache');

const cleanCache = catchAsync(async(req, res, next) =>{
    await next();
    clearCache(req.user._id);
})

module.exports = cleanCache;