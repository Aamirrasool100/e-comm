const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
// userSchema.methods.addToCart = function(){
//     const product = this
//     const cartProductIndex = product.cart.items.findIndex(cart =>{
//         return cart.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1;
//     const updatedCartItems = [...product.cart.items]

//     if(cartProductIndex >= 0){
//         newQuantity = product.cart.items[cartProductIndex].quantity + 1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//     }else{
//         updatedCartItems.push({
//             productId:product._id,
//             quantity:newQuantity
//         })
//     }
//     product.cart = updatedCart
//     return product.save()
// }
const Product = mongoose.model('Product',productSchema)
module.exports = Product