const Product = require('../model/productModel')
exports.getProducts = async(req,res)=>{
    const products = await Product.find()
      try{
        res.render('shop/list-products',{
            title:"Shop",
            prods:products,
            hasProducts:products.length > 0
        })
      }catch(e){
          res.redirect('/')
      }
}
exports.getProduct = async(req,res) =>{
    const id = req.params.id
    try{
        const product = await Product.findById(id)
        if(!product){
            res.redirect('/')
        }
            res.render('shop/product-detail',{
                title:'product-detail',
                product
            })
     }catch(e){

     }
}
exports.getIndex = async(req,res,next)=>{
    const products = await Product.find()
      try{
        res.render('shop/index',{
            title:products.title,
            price:products.price,
            description:products.description,
            prods:products,
            path:'/',
            hasProducts:products.length > 0
        })
      }catch(e){
          res.redirect('/')
      }
}

exports.postCart = async(req,res) =>{
    const id = req.body.id
    try{
        const product = await Product.findById(id)
        res.render('shop/cart',{
            product
        })
    }catch(e){
         console.log({"error":e});
    }   
}
exports.getOrders = (req,res)=>{
    res.render('shop/orders',{
        title:"Orders",
        path:'/orders'
    })
}
exports.checkout = (req,res) =>{
    res.render('shop/checkout',{
        title:"Checkout",
        path:'/checkout'
    })
}
exports.getDetail = (req,res) =>{
    res.render('shop/product-detail',{
        title:"Detail",
        path:'/detail'
    })
}