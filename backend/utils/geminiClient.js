import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI

const getClient = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }

  return genAI
}

/*
|--------------------------------------------------------------------------
| DEMO WASTE DATA
|--------------------------------------------------------------------------
*/

const DEMO_WASTE_DATA = {
  plastic: {
    itemName: 'Plastic Water Bottle',
    wasteType: 'Recyclable',
    confidence: 96,
    recommendedBin: 'Blue Recycling Bin',
    material: 'PET (Polyethylene Terephthalate)',

    description:
      'A clear single-use plastic bottle commonly used for drinking water and soft drinks.',

    recyclable: true,

    disposalSteps: [
      'Empty any remaining liquid from the bottle.',
      'Rinse the bottle if necessary.',
      'Keep the cap with the bottle if accepted by your local recycling system.',
      'Place it in the appropriate recyclable waste stream.'
    ],

    environmentalImpact:
      'Recycling PET bottles reduces the need for new plastic production and helps prevent plastic waste from accumulating in landfills and natural environments.',

    ecoTip:
      'Choose a reusable water bottle whenever possible to reduce single-use plastic consumption.'
  },

  battery: {
    itemName: 'Lithium-Ion Battery',
    wasteType: 'E-Waste',
    confidence: 94,
    recommendedBin: 'E-Waste Collection Bin',
    material: 'Lithium-ion cells and metal components',

    description:
      'A rechargeable battery commonly found in smartphones, laptops, power banks and other electronic devices.',

    recyclable: true,

    disposalSteps: [
      'Do not throw the battery into regular household waste.',
      'Do not puncture, open or burn the battery.',
      'Keep damaged batteries away from heat and flammable materials.',
      'Take it to an authorized e-waste or battery collection facility.'
    ],

    environmentalImpact:
      'Improper battery disposal can create chemical and fire hazards. Specialized recycling allows useful materials to be recovered safely.',

    ecoTip:
      'Never put batteries in your normal garbage or recycling bin.'
  },

  banana: {
    itemName: 'Banana Peel',
    wasteType: 'Organic',
    confidence: 98,
    recommendedBin: 'Green Organic Waste Bin',
    material: 'Biodegradable organic matter',

    description:
      'A biodegradable food-waste item that can naturally decompose and can be processed through composting.',

    recyclable: false,

    disposalSteps: [
      'Separate the peel from other non-organic waste.',
      'Place it in the organic or compost waste stream.',
      'Add it to a suitable home compost system if available.'
    ],

    environmentalImpact:
      'Separating organic waste helps reduce landfill volume and allows biodegradable materials to return nutrients to the soil through composting.',

    ecoTip:
      'Compost fruit and vegetable scraps whenever a suitable composting system is available.'
  },

  paper: {
    itemName: 'Paper',
    wasteType: 'Recyclable',
    confidence: 97,
    recommendedBin: 'Blue Recycling Bin',
    material: 'Paper / cellulose fibers',

    description:
      'A paper-based waste item that can generally be recycled when it is clean and dry.',

    recyclable: true,

    disposalSteps: [
      'Keep the paper clean and dry.',
      'Remove non-paper materials where possible.',
      'Flatten larger paper items.',
      'Place it in the appropriate recycling stream.'
    ],

    environmentalImpact:
      'Recycling paper reduces the demand for virgin raw materials and helps conserve energy, water and other resources.',

    ecoTip:
      'Use both sides of paper before sending it for recycling.'
  },

  can: {
    itemName: 'Aluminium Can',
    wasteType: 'Recyclable',
    confidence: 95,
    recommendedBin: 'Blue Recycling Bin',
    material: 'Aluminium',

    description:
      'An aluminium beverage container that can be recycled and processed into new aluminium products.',

    recyclable: true,

    disposalSteps: [
      'Empty the remaining contents.',
      'Give the can a quick rinse if necessary.',
      'Do not place hazardous substances inside the can.',
      'Put it in the appropriate recyclable waste stream.'
    ],

    environmentalImpact:
      'Recycling aluminium requires significantly less energy than producing new aluminium from raw materials and allows the material to be used again.',

    ecoTip:
      'Always recycle aluminium cans instead of throwing them into general waste.'
  }
}

/*
|--------------------------------------------------------------------------
| Find demo result based on uploaded filename
|--------------------------------------------------------------------------
*/

const getDemoWasteResult = (fileName = '') => {
  const name = fileName.toLowerCase()

  console.log('DEMO FILE NAME:', fileName)

  if (name.includes('battery')) {
    console.log('DEMO RESULT: BATTERY')
    return DEMO_WASTE_DATA.battery
  }

  if (name.includes('banana')) {
    console.log('DEMO RESULT: BANANA')
    return DEMO_WASTE_DATA.banana
  }

  if (name.includes('paper')) {
    console.log('DEMO RESULT: PAPER')
    return DEMO_WASTE_DATA.paper
  }

  if (name.includes('can')) {
    console.log('DEMO RESULT: CAN')
    return DEMO_WASTE_DATA.can
  }

  if (name.includes('plastic') || name.includes('bottle')) {
    console.log('DEMO RESULT: PLASTIC')
    return DEMO_WASTE_DATA.plastic
  }

  /*
  |----------------------------------------------------------------------
  | Default result
  |----------------------------------------------------------------------
  */

  console.log('DEMO RESULT: DEFAULT PLASTIC')

  return DEMO_WASTE_DATA.plastic
}

/*
|--------------------------------------------------------------------------
| Waste Image Analysis
|--------------------------------------------------------------------------
|
| DEMO MODE:
| We are intentionally NOT calling Gemini for image analysis.
| The uploaded filename determines the demo result.
|
*/

export const analyzeWasteImage = async (
  base64Image,
  mimeType,
  fileName = ''
) => {
  return {
    ...getDemoWasteResult(fileName)
  }
}

/*
|--------------------------------------------------------------------------
| Gemini JSON generation
|--------------------------------------------------------------------------
*/

const stripCodeFences = (text) =>
  text
    .trim()
    .replace(/^```(json)?/i, '')
    .replace(/```$/, '')
    .trim()

export const generateJSON = async (prompt) => {
  const model = getClient().getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',

    generationConfig: {
      responseMimeType: 'application/json'
    }
  })

  const result = await model.generateContent(prompt)

  return JSON.parse(
    stripCodeFences(result.response.text())
  )
}

/*
|--------------------------------------------------------------------------
| Demo Chat Topic-Based Responses
|--------------------------------------------------------------------------
|
| Deterministic topic-based matching for hackathon demo mode.
| Evaluates keywords case-insensitively and maps user intent to
| specific recycling, disposal, and sustainability advice.
|
*/

const TOPIC_RESPONSES = [
  {
    topic: 'pizza',
    keywords: ['pizza box', 'pizza'],
    response:
      'Clean parts of pizza boxes (like the grease-free top lid) can be recycled with paper and cardboard. However, any sections soiled with grease, cheese, or food residue cannot be recycled and should be composted or placed in general waste.'
  },
  {
    topic: 'battery',
    keywords: [
      'battery',
      'batteries',
      'e-waste',
      'ewaste',
      'electronic',
      'electronics',
      'phone',
      'smartphone',
      'laptop',
      'charger',
      'cable',
      'gadget',
      'cell',
      'power bank',
      'powerbank'
    ],
    response:
      'Batteries and electronic waste should never be thrown into regular household waste. They contain heavy metals and hazardous chemicals that create fire hazards and environmental contamination. Please take them to an authorized battery or e-waste collection center for safe recycling.'
  },
  {
    topic: 'plastic',
    keywords: [
      'plastic bottle',
      'plastic',
      'plastics',
      'bottle',
      'bottles',
      'pet bottle',
      'polythene',
      'polyethylene',
      'polypropylene',
      'wrapper',
      'wrappers',
      'straw',
      'straws',
      'bag',
      'bags'
    ],
    response:
      'Plastic waste should be separated according to local recycling guidelines. Clean rigid plastic bottles and containers (such as PET and HDPE) can typically be recycled in the blue recycling bin. Always empty and rinse containers, and consider reusable alternatives to reduce single-use plastic consumption.'
  },
  {
    topic: 'paper',
    keywords: [
      'paper',
      'cardboard',
      'carton',
      'newspaper',
      'magazine',
      'book',
      'books',
      'box',
      'boxes',
      'envelope'
    ],
    response:
      'Clean and dry paper and cardboard are widely recyclable. Flatten cardboard boxes to save space in your blue recycling bin. Avoid recycling wet, greasy, or food-contaminated paper, as contaminants can ruin entire recycling batches.'
  },
  {
    topic: 'organic',
    keywords: [
      'organic waste',
      'food waste',
      'organic',
      'organics',
      'compost',
      'composting',
      'food scraps',
      'food scrap',
      'food',
      'banana',
      'banana peel',
      'fruit',
      'fruits',
      'vegetable',
      'vegetables',
      'peel',
      'peels',
      'scraps',
      'biodegradable',
      'coffee grounds',
      'leftover',
      'leftovers'
    ],
    response:
      'Organic waste such as fruit peels, vegetable scraps, coffee grounds, and leftovers should go into your green organic waste bin or a home compost system. Composting allows biodegradable matter to naturally decompose into nutrient-rich soil rather than generating greenhouse gases in landfills.'
  },
  {
    topic: 'glass',
    keywords: [
      'glass bottle',
      'glass jar',
      'glass',
      'jar',
      'jars',
      'broken glass'
    ],
    response:
      'Glass bottles and jars are 100% recyclable and can be recycled indefinitely without loss of purity or quality. Rinse them and remove caps or lids before placing them in the recycling stream. For broken glass, wrap it safely to prevent injury during collection.'
  },
  {
    topic: 'metal',
    keywords: [
      'aluminium can',
      'aluminum can',
      'soda can',
      'beverage can',
      'tin can',
      'metal can',
      'aluminium',
      'aluminum',
      'metal',
      'tin',
      'steel',
      'foil',
      'tin foil',
      'cans'
    ],
    response:
      'Metal and aluminium cans are infinitely recyclable and use 95% less energy to recycle than producing new metal from raw materials. Empty and lightly rinse cans before placing them into the blue recycling or dry-waste bin.'
  },
  {
    topic: 'hazardous',
    keywords: [
      'hazardous',
      'chemical',
      'chemicals',
      'paint',
      'paints',
      'solvent',
      'solvents',
      'oil',
      'motor oil',
      'pesticide',
      'pesticides',
      'toxic',
      'poison',
      'medical',
      'medicine',
      'medicines',
      'expired medicine'
    ],
    response:
      'Hazardous household items including paints, chemicals, motor oil, and medications require specialized disposal. Never pour them down household drains or toss them in standard bins; take them to designated local hazardous waste collection points.'
  },
  {
    topic: 'textile',
    keywords: [
      'clothes',
      'clothing',
      'fabric',
      'fabrics',
      'textile',
      'textiles',
      'garment',
      'garments',
      'shoes',
      'apparel'
    ],
    response:
      'Wearable clothing and shoes should be donated, swapped, or repurposed. For worn-out fabrics, look for specialized textile recycling drop-off bins to keep textiles out of landfills.'
  },
  {
    topic: 'bin',
    keywords: [
      'blue bin',
      'green bin',
      'red bin',
      'yellow bin',
      'black bin',
      'waste bin',
      'bin colors',
      'color code',
      'segregation',
      'segregate',
      'separate waste'
    ],
    response:
      'Waste segregation bins are typically categorized as: Blue bins for dry recyclables (paper, plastic, metal, glass), Green bins for organic food scraps and compost, and Red or specialized bins for hazardous and e-waste. Always check your local municipality guidelines.'
  },
  {
    topic: 'recycling',
    keywords: [
      'recycling',
      'recycle',
      'recyclable',
      'recycled',
      'how to recycle',
      'is this recyclable'
    ],
    response:
      'Recycling helps turn used materials such as paper, plastic, glass, and metal into new products. Make sure recyclable items are clean, dry, and separated before placing them in the appropriate recycling bin.'
  }
]

export const getChatReply = async (history = [], message = '') => {
  const normalizedMessage = (message || '').toLowerCase().trim()
  console.log('DEMO CHAT MESSAGE:', normalizedMessage)

  for (const item of TOPIC_RESPONSES) {
    for (const keyword of item.keywords) {
      if (normalizedMessage.includes(keyword)) {
        return item.response
      }
    }
  }

  // Sensible default response for general sustainability questions or greetings
  return "I'm GreenBin AI 🌱, your sustainability assistant! I can help you with waste segregation, recycling (plastic, paper, glass, metal), composting food scraps, or safely disposing of batteries and e-waste. Try asking about a specific item or material!"
}