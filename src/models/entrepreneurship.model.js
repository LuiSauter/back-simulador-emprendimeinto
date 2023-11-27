import { Schema, model } from 'mongoose'

const entrepreneurshipSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  industry: { type: String, required: true },
  location: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estimatedIncome: { // ingresos_estimados
    shortTerm: { type: Number, required: true },
    longTerm: { type: Number, required: true }
  },
  costs: {
    fixed: { type: Number, required: true },
    variables: { type: Number, required: true }
  },
  production: {
    unitsProduced: { type: Number, required: true },
    productionCapacity: { type: Number, required: true }
  },
  prices: {
    actualPrice: { type: Number },
    newPrice: { type: Number }
  },
  offerDemand: {
    currentDemand: Number,
    newDemand: Number,
    currentOffer: Number,
    newOffer: Number
  },
  simulationResults: [{
    type: Schema.Types.ObjectId,
    ref: 'Simulation'
  }]
}, { timestamps: true })

export default model('Entrepreneurship', entrepreneurshipSchema)
