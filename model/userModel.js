const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please Enter a Valid Email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain letter "password"')
            }
        }
    },
    resetToken:String,
    resetTokenExpiration:Date
})
userSchema.virtual('product',{
    ref:'Product',
    localField:"_id",
    foreignField:"user"
})
userSchema.methods.toJSON = function(next){
    const user = this;
    const userObj = user.toObject()
     delete userObj.password
     return userObj
}
userSchema.statics.findByCredentials = async function(email,password){
   const user = await User.findOne({email})
   if(!user){
       throw new Error('Invalid Email / Password.')
   }
   const isValid = await bcrypt.compare(password,user.password)
   if(!isValid){
        throw new Error('Invalid Email / Password.')
   }
   return user
}
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User   