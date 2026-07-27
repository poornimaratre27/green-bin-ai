import { GoogleGenerativeAI } from '@google/generative-ai'

// Constructed lazily (on first use) rather than at module load time —
// server.js pulls this module in via a chain of static imports, which ES
// modules fully evaluate before server.js's own dotenv.config() call runs.
// Reading process.env.GEMINI_API_KEY here (inside a function, called only
// after the server has started) guarantees dotenv has already run.
let genAI

const getClient = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
  return genAI
}

const WASTE_PROMPT = `You are a waste classification assistant. Look at the item in this image and identify it.
Respond with ONLY a JSON object (no markdown, no code fences, no extra commentary) matching exactly this shape:
{
  "itemName": "short common name of the item, e.g. Plastic Water Bottle",
  "wasteType": "Recyclable | Organic | Hazardous | E-Waste | General Waste",
  "confidence": a whole number between 0 and 100 representing how confident you are in this identification,
  "recommendedBin": "which bin it belongs in, e.g. Blue Recycling Bin, Green Compost Bin, Red Hazardous Bin, Black General Waste Bin",
  "description": "one or two sentence description of what the item is and why it belongs in this category",
  "recyclable": true or false,
  "environmentalImpact": "one or two sentence explanation of the environmental impact of this item if disposed of incorrectly, or the benefit of disposing of it correctly"
}`

const stripCodeFences = (text) =>
  text
    .trim()
    .replace(/^```(json)?/i, '')
    .replace(/```$/, '')
    .trim()

export const analyzeWasteImage = async (base64Image, mimeType) => {
  const model = getClient().getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
    generationConfig: { responseMimeType: 'application/json' }
  })

  const result = await model.generateContent([
    { text: WASTE_PROMPT },
    { inlineData: { data: base64Image, mimeType } }
  ])

  const parsed = JSON.parse(stripCodeFences(result.response.text()))
  const { itemName, wasteType, confidence, recommendedBin, description, recyclable, environmentalImpact } = parsed

  if (
    !itemName ||
    !wasteType ||
    typeof confidence !== 'number' ||
    !recommendedBin ||
    !description ||
    typeof recyclable !== 'boolean' ||
    !environmentalImpact
  ) {
    throw new Error('Gemini returned an incomplete result')
  }

  return { itemName, wasteType, confidence, recommendedBin, description, recyclable, environmentalImpact }
}

export const generateJSON = async (prompt) => {
  const model = getClient().getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
    generationConfig: { responseMimeType: 'application/json' }
  })

  const result = await model.generateContent(prompt)
  return JSON.parse(stripCodeFences(result.response.text()))
}

const CHAT_SYSTEM_INSTRUCTION = `You are GreenBin AI's sustainability assistant. Answer questions about recycling, waste disposal, and sustainable living in a friendly, concise, conversational way (2-4 sentences). If a question is unrelated to sustainability, waste, or recycling, gently steer the conversation back to those topics.`

export const getChatReply = async (history, message) => {
  const model = getClient().getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
    systemInstruction: CHAT_SYSTEM_INSTRUCTION
  })

  const chat = model.startChat({
    history: history.map((msg) => ({ role: msg.role, parts: [{ text: msg.content }] }))
  })

  const result = await chat.sendMessage(message)
  return result.response.text()
}
