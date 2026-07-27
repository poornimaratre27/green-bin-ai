import Chat from '../models/Chat.js'
import { getChatReply } from '../utils/geminiClient.js'

export const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user._id })
    res.json({ messages: chat?.messages || [] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const sendChatMessage = async (req, res) => {
  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Please enter a message' })
    }

    let chat = await Chat.findOne({ user: req.user._id })
    if (!chat) {
      chat = await Chat.create({ user: req.user._id, messages: [] })
    }

    const reply = await getChatReply(chat.messages, message.trim())

    chat.messages.push({ role: 'user', content: message.trim() })
    chat.messages.push({ role: 'model', content: reply })
    await chat.save()

    res.status(201).json({ reply, messages: chat.messages })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to get a response' })
  }
}
