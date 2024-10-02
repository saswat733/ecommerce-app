import express from 'express'
import { allProducts, getProductsByCategory, getSingleProducts, searchProducts } from '../controllers/products.controller.js'

const router = express.Router()

router.route('/allProducts').get(allProducts)
router.route('/category/:category').get(getProductsByCategory)
router.route('/:id').get(getSingleProducts)
router.route('/search/:query').get(searchProducts)

export default router