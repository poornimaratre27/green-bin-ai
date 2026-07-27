import express from 'express'
import { getChatHistory, sendChatMessage } from '../controllers/chatController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getChatHistory)
router.post('/', protect, sendChatMessage)

export default router
