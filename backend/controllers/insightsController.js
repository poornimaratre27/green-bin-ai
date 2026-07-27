import {
  getEcoTip,
  getDidYouKnow,
  getEnvironmentalQuote,
  getDailyChallenge
} from '../services/insightsService.js'

export const ecoTip = async (req, res) => {
  try {
    res.json(await getEcoTip())
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate eco tip' })
  }
}

export const didYouKnow = async (req, res) => {
  try {
    res.json(await getDidYouKnow())
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate fact' })
  }
}

export const environmentalQuote = async (req, res) => {
  try {
    res.json(await getEnvironmentalQuote())
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate quote' })
  }
}

export const dailyChallenge = async (req, res) => {
  try {
    res.json(await getDailyChallenge())
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate daily challenge' })
  }
}
