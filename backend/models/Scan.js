import mongoose from 'mongoose'

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imageUrl: { type: String, required: true },
    itemName: { type: String, required: true },
    wasteType: { type: String, required: true },
    confidence: { type: Number, required: true },
    recommendedBin: { type: String, required: true },
    description: { type: String, required: true },
    recyclable: { type: Boolean, required: true },
    environmentalImpact: { type: String, required: true },
    points: { type: Number, default: 10 }
  },
  { timestamps: true }
)

export default mongoose.model('Scan', scanSchema)
