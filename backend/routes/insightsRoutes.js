import express from 'express'
import {
  ecoTip,
  didYouKnow,
  environmentalQuote,
  dailyChallenge
} from '../controllers/insightsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/eco-tip', protect, ecoTip)
router.get('/did-you-know', protect, didYouKnow)
router.get('/quote', protect, environmentalQuote)
router.get('/daily-challenge', protect, dailyChallenge)

export default router
