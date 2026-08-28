// Temporary: Gemini's free-tier quota (20 requests/day/model) is easily
// exhausted, so all four insights use a static rotation instead of calling
// the API. Swap back to Gemini (see git history for the generateJSON +
// withCache pattern used before) once on a paid plan.

const DUMMY_ECO_TIPS = [
  'Rinse and dry plastic, glass, and metal containers before recycling them — food residue can contaminate an entire batch and send it to the landfill instead.',
  'Unplug chargers and small appliances when they are not in use — many still draw "phantom" power even with nothing connected.',
  'Bring reusable bags when you shop — a single plastic bag can take up to 20 years to decompose.',
  'Compost fruit and vegetable scraps instead of throwing them away — it keeps organic waste out of landfills and enriches soil.',
  "Batteries and electronics don't belong in regular trash — drop them off at a certified e-waste recycling point."
]

const DUMMY_QUOTES = [
  { quote: 'The Earth is what we all have in common.', author: 'Wendell Berry' },
  { quote: 'We do not inherit the earth from our ancestors; we borrow it from our children.', author: 'Native American Proverb' },
  { quote: 'The greatest threat to our planet is the belief that someone else will save it.', author: 'Robert Swan' },
  {
    quote: 'What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.',
    author: 'Mahatma Gandhi'
  },
  { quote: 'There is no such thing as away. When we throw anything away it must go somewhere.', author: 'Annie Leonard' }
]

const DUMMY_FACTS = [
  'Recycling a single aluminum can saves enough energy to power a TV for three hours, and that same can be back on a store shelf as a new product in as little as 60 days.',
  'It takes an estimated 450 years for a single plastic bottle to decompose in a landfill.',
  'Glass never wears out — it can be recycled endlessly without ever losing purity or quality.',
  'Recycling one ton of paper saves about 17 trees and roughly 7,000 gallons of water.',
  'The energy saved from recycling one glass bottle can power a computer for 25 minutes.'
]

const DUMMY_CHALLENGES = [
  {
    title: 'Rinse Three Recyclables',
    description: 'Find three used jars, cans, or plastic containers today and give them a quick rinse before placing them in your recycling bin.',
    points: 15
  },
  {
    title: 'Skip Single-Use Plastic',
    description: 'Avoid using any single-use plastic items — bags, straws, cutlery — for the rest of today.',
    points: 20
  },
  {
    title: 'E-Waste Check',
    description: 'Find one old battery, cable, or small electronic you no longer use and set it aside for proper e-waste recycling.',
    points: 15
  },
  {
    title: 'Compost Something',
    description: 'Set aside your fruit or vegetable scraps today and start — or add to — a compost pile or bin.',
    points: 10
  },
  {
    title: 'Reusable Swap',
    description: 'Use a reusable bottle, bag, or container at least once today instead of a disposable one.',
    points: 10
  }
]

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

export const getEcoTip = async () => ({ tip: pickRandom(DUMMY_ECO_TIPS) })

export const getEnvironmentalQuote = async () => pickRandom(DUMMY_QUOTES)

export const getDidYouKnow = async () => ({ fact: pickRandom(DUMMY_FACTS) })

export const getDailyChallenge = async () => pickRandom(DUMMY_CHALLENGES)
