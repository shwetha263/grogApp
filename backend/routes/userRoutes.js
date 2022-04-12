import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()
import {
  authUser,
  getUserById,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/:id').get(protect, admin, getUserById)

export default router
