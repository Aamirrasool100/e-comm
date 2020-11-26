const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()
router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.post('/logout',authController.postLogout)
router.get('/register',authController.getRegister)
router.post('/register',authController.postRegister)

module.exports = router