import express from 'express'
import { analyzeScan, getScanHistory, getScanStats } from '../controllers/scanController.js'
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', protect, getScanHistory)
router.get('/stats', protect, getScanStats)
router.post('/analyze', protect, upload.single('image'), analyzeScan)

export default router
