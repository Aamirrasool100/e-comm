const Product = require('../model/productModel')

exports.getAddProducts = (req,res)=>{
    res.render('admin/add-product',{
        isLoggedIn:req.session.isLoggedIn
    })
}
exports.postAddProducts = async(req,res)=>{
    const product = await new Product(req.body) 
    try{
       await product.save()
        res.redirect('/')
    }catch(e){
        res.redirect('admin/add-product')
    }
} 
exports.getProducts = async(req,res,next)=>{
    const products = await Product.find()
      try{
        res.render('admin/products',{
            title:"Products",
            prods:products,
            path:'/admin/products',
            hasProducts:products.length > 0
        })
      }catch(e){
          res.redirect('/')
      }
}
exports.getEditProduct = async(req,res) =>{
    const product = await Product.findById(req.params.id)
    try{
        res.render('admin/edit-product',{
            product
        })
    }catch(e){
        res.json({'error':e})
    }
}
exports.postEditProduct = async(req,res) =>{
       const id = req.body.id
    try{
       const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
       if(!product){
           console.log('error')
       }
       await product.save()
       res.render('admin/products',{
           prods:product
       })
   }catch(e){
       res.redirect('/admin/edit-product')
   }


}

exports.getDeleteProduct = async(req,res) =>{
    const id = req.params.id
    try{
        const product = await Product.findByIdAndDelete(id)
        res.redirect('/admin/products')
    }catch(e){
        res.redirect('/admin/products')
    }
}
