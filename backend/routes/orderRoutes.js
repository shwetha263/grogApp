import express from 'express'

const router = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderbyId,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderbyId)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
