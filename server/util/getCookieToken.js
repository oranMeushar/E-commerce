const jwt = require('jsonwebtoken');

const getCookieToken = (userId) =>{
    const cookieOptions = {
       httpOnly:true,
       maxAge:process.env.COOKIE_EXPIRE * 60 * 60 * 1000,
       sameSite:'lax' 
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    const jwtOptions = {
        expiresIn:process.env.JWT_EXPIRE * 60 * 60 * 1000
    }

    const token = jwt.sign({userId}, process.env.JWT_SECRET, jwtOptions);
    return{
        token,
        cookieOptions
    }
}

module.exports = getCookieToken;