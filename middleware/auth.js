const auth = (req,res,next) =>{
    if(req.session.isLoggedIn){
        next()
    }else{
        res.render('auth/login',{isLoggedIn:false})
    }
}
module.exports = auth