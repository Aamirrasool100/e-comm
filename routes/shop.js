const express = require('express')
const shopController = require('../controllers/shopController')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',shopController.getIndex)
router.get('/products',shopController.getProducts)
// router.get('/cart/:id',shopController.getCart)
router.post('/cart',auth,shopController.postCart)
router.get('/products/:id',auth,shopController.getProduct)
router.get('/orders',auth,shopController.getOrders)
router.get('/checkout',auth,shopController.checkout)
// router.get('/product')
router.get('/detail',auth,shopController.getDetail)

module.exports = router