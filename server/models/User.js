const mongoos = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:false,
}

const userSchema = new mongoos.Schema({
    name:{
        type:'string',
        required:[true, 'Please provide a name'],
        minLength:[2, 'Name must contain at least 2 characters'],
        maxLength:[30, 'Name must contain at most 30 characters'],
    },
    email:{
        type:'string',
        required:[true, 'Please provide an email address'],
        unique:[true,'Email already exists'],
        maxLength:[50, 'Email must have at-most 50 characters'],
        validate:[isValidEmail, 'Invalid email']
    },
    password:{
        type:'string',
        required:[true, 'Please provide a password'],
        minLength:[6, 'password must contain at-least 6 characters'],
        maxLength:[50, 'password must contain at-most 50 characters'],
        select:false
    },
    passwordConfirm:{
        type:'string',
        required:[true, 'Please confirm password'],
        minLength:[6, 'Passwords are not equal or invalid'],
        maxLength:[50, 'Passwords are not equal or invalid'],
        validate:[isEqual, 'Passwords are not equal']
    },
    about:{
        type: 'string',
        maxLength:[100, 'Please provide description with at-most 100 characters'],
    },
    //TODO:implement history??
    role:{
        type:'string',
        default:'authenticated',
        enum:['authenticated', 'admin'],
    },
    passwordResetToken:{
        type:'string',
    },
    passwordResetExpired:{
        type:Date
    }
}, options);



function isValidEmail(email){
    return validator.isEmail(validator.trim(email));
}
function isEqual(passwordConfirm){
    return this.password === passwordConfirm
}

userSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const hashPassword = await bcrypt.hash(this.password, 12);
        this.password = hashPassword;
        this.passwordConfirm = undefined;
        next();
    }
    else{
        next();
    }
});

userSchema.methods = {
    isPassword:async function(password, hashPassword){
        return await bcrypt.compare(password, hashPassword);
    },
    generateResetToken:async function(){
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpired = Date.now() + 15 * 60 * 1000
        await this.save({validateBeforeSave:false})
        return resetToken;
    }

}

const User = mongoos.model('User', userSchema);

module.exports = User;