const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const {welcomeMail,resetPassword} = require('../emails/email')

exports.getRegister = (req, res) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }

    res.render('auth/register', {
        isLoggedIn: false,
        errorMessage: message
    })
}
exports.getLogin = (req, res) => {
    let message = req.flash('error')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/login', {
        errorMessage: message
    })
}
exports.postRegister = async (req, res) => {
    
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.send('Email is already taken..try another')
        }
        user = await new User(req.body)
        if (!user) {
            throw new Error('Something went wrong..try again')
        }
        req.session.user = user
        req.session.isLoggedIn = true
        await req.session.save()
        await user.save()
        welcomeMail(user.email,user.name)
        res.redirect('/login')
    } catch (e) {
        req.flash('error', e)
        console.log(e);
        res.redirect('/register')
    }
}
exports.postLogin = async (req, res) => {
    try {
           const user = await User.findByCredentials(req.body.email,req.body.password)
            req.session.isLoggedIn = true;
            req.session.user = user
            await req.session.save()
            await user.save()
            res.redirect('/')
        }catch (e) {
        req.flash("error", "Invalid email or password")
        res.redirect('/login')
    }
}
exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')

    })
}
exports.getReset = (req,res) =>{
    let message = req.flash('error')
    if(message.length > 0){
         message =message[0]
    }else{message = null};
    res.render('auth/reset',{
        errorMessage:message
    })
}
exports.postReset = (req,res) =>{
    crypto.randomBytes(32,(err,buffer) =>{
         if(err){
             console.log(err);
            return  res.redirect('/reset')
         }
          const token = buffer.toString('hex');
           User.findOne({email:req.body.email}).then(user =>{
               if(!user){
                   req.flash('error',"no account with that email")
                   return res.redirect('/reset')
               }
               user.resetToken = token
               user.resetTokenExpriration = Date.now() + 3600000
               user.save().then(result =>{
                   res.redirect('/')
                   console.log(token);
                   resetPassword(req.body.email,token)
               }).catch(e =>console.log(e))
           }).catch(e =>console.log(e))
     })
}