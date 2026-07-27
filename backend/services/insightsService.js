import { generateJSON } from '../utils/geminiClient.js'
import { withCache } from '../utils/cache.js'

const ONE_HOUR_MS = 60 * 60 * 1000

const ECO_TIP_PROMPT = `Give one practical, specific eco-friendly tip for everyday waste sorting or sustainable living.
Respond with ONLY a JSON object (no markdown, no code fences) matching exactly this shape:
{ "tip": "one or two sentence actionable tip" }`

const DID_YOU_KNOW_PROMPT = `Share one surprising, verifiable fact about recycling, waste, or the environment.
Respond with ONLY a JSON object (no markdown, no code fences) matching exactly this shape:
{ "fact": "one or two sentence interesting fact" }`

const QUOTE_PROMPT = `Give one real, well-known environmental or sustainability quote from a notable person.
Respond with ONLY a JSON object (no markdown, no code fences) matching exactly this shape:
{ "quote": "the quote text", "author": "who said it" }`

const DAILY_CHALLENGE_PROMPT = `Create one small, achievable daily challenge that encourages a user to recycle or reduce waste today.
Respond with ONLY a JSON object (no markdown, no code fences) matching exactly this shape:
{ "title": "short challenge title", "description": "one or two sentence description of what to do", "points": a whole number between 5 and 30 }`

export const getEcoTip = () =>
  withCache('insights:eco-tip', ONE_HOUR_MS, async () => {
    const { tip } = await generateJSON(ECO_TIP_PROMPT)
    if (!tip) throw new Error('Gemini returned an incomplete eco tip')
    return { tip }
  })

export const getDidYouKnow = () =>
  withCache('insights:did-you-know', ONE_HOUR_MS, async () => {
    const { fact } = await generateJSON(DID_YOU_KNOW_PROMPT)
    if (!fact) throw new Error('Gemini returned an incomplete fact')
    return { fact }
  })

export const getEnvironmentalQuote = () =>
  withCache('insights:quote', ONE_HOUR_MS, async () => {
    const { quote, author } = await generateJSON(QUOTE_PROMPT)
    if (!quote || !author) throw new Error('Gemini returned an incomplete quote')
    return { quote, author }
  })

export const getDailyChallenge = () =>
  withCache('insights:daily-challenge', ONE_HOUR_MS, async () => {
    const { title, description, points } = await generateJSON(DAILY_CHALLENGE_PROMPT)
    if (!title || !description || typeof points !== 'number') {
      throw new Error('Gemini returned an incomplete daily challenge')
    }
    return { title, description, points }
  })
