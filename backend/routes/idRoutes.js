import express from 'express'

const router = express.Router()
import {
  extractText,
  verifyIdentity,
} from '../controllers/identityVerifyController.js'

router.route('/idVerification').post(verifyIdentity)
router.route('/extract').get(extractText)
export default router
