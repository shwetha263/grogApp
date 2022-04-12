import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
import {
  createReview,
  getProductById,
  getProducts,
  getTopProducts,
} from '../controllers/productController.js'

router.route('/').get(getProducts)
router.route('/:id/reviews').post(protect, createReview)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById)

export default router
