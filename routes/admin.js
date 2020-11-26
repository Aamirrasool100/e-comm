const express = require('express')
const auth = require('../middleware/auth')
const productsController = require('../controllers/productsController')

const router = express.Router()
//   PATH => /ADMIN/....A
router.get('/add-product',auth,productsController.getAddProducts)
router.post('/add-product',auth,productsController.postAddProducts)
router.get('/products',auth,productsController.getProducts)
router.get('/edit-product/:id',auth,productsController.getEditProduct)
router.post('/edit-product',auth,productsController.postEditProduct)
router.get('/delete-product/:id',auth,productsController.getDeleteProduct)

//  POST ROUTES

module.exports = router;
