const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    totalPrice:{
        default:0
    },
    product:{
        type:mongoose.Schema.Types.ObjectId
    }
})
const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart