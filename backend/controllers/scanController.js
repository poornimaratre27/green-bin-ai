import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import Scan from '../models/Scan.js'
import { analyzeWasteImage } from '../utils/geminiClient.js'
import { getBadgeProgress } from '../utils/badges.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')

const SCAN_POINTS = 10

export const analyzeScan = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' })
    }

    const base64Image = req.file.buffer.toString('base64')
    const result = await analyzeWasteImage(base64Image, req.file.mimetype,req.file.originalname)

    const ext = path.extname(req.file.originalname) || '.jpg'
    const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`

    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), req.file.buffer)

    const scan = await Scan.create({
      user: req.user._id,
      imageUrl: `/uploads/${filename}`,
      ...result,
      points: SCAN_POINTS
    })

    res.status(201).json(scan)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to analyze image' })
  }
}

export const getScanHistory = async (req, res) => {
  try {
    const { category } = req.query
    const filter = { user: req.user._id }

    if (category) {
      filter.wasteType = category
    }

    const scans = await Scan.find(filter).sort({ createdAt: -1 })
    res.json(scans)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getScanStats = async (req, res) => {
  try {
    const itemsRecycled = await Scan.countDocuments({ user: req.user._id })

    const [{ ecoScore } = { ecoScore: 0 }] = await Scan.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, ecoScore: { $sum: '$points' } } }
    ])

    const { badges, progress } = getBadgeProgress(itemsRecycled)

    res.json({ ecoScore, itemsRecycled, badges, progress })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
