const sgMail = require('@sendgrid/mail')

const sendGrid_API = process.env.sendGridAPI
sgMail.setApiKey(sendGrid_API)

const welcomeMail = (email,name) =>{
    sgMail.send({
        to:email,
        from:"aamirrasool100@gmail.com",
        subject:"Welcome",
        html:`<h1>Welcome ${name}</h1>`
    })
}
const resetPassword = (email,token)=>{
    sgMail.send({
        to:email,
        from:"aamirrasool100@gmail.com",
        subject:"resettting your password",
        html:`
        <p>Want to reset your password</p>
        <p>click on this link to set a new password <a href=\"http://localhost:2000/reset/${token}\"</p>
        `
    })
}
module.exports = {
    welcomeMail,
    resetPassword
}
