const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const path = require('path')
const User = require('./model/userModel')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
const authRouter = require('./routes/auth')

const app = express()
//JSON BODY PARSER
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//MONGODB STORE

const store = new MongoDBStore({
    uri:process.env.MONGO_URL,
    collection:"Sessions"
})
//EXPRESS CONFIG
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:1000 * 60 * 60 * 24 * 7
    },
    store
}))

//CONNECT FLASH
app.use(flash())
//   LOCAL TOKEN
app.use((req,res,next) =>{
    res.locals.isLoggedIn = req.session.isLoggedIn;
    next()
})
//PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname,'/public')))
//EJS CONFIG
app.set('view engine','ejs')
app.set('views',"views")
//ROUTES
app.use("/admin",adminRouter)
app.use(shopRouter)
app.use(authRouter)


app.all('*',(req,res)=>{
    res.json({
        error:" Page Not Found",
        status:404
    })
})

mongoose.connect(process.env.MONGO_URL,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((client)=>{
    app.listen(process.env.PORT,console.log(`listening on port ${process.env.PORT}/2000`))
}).catch((e)=>{console.log({"Error":"Cannot Connect to DB"});})