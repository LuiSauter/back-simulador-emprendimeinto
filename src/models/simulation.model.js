import { Schema, model } from 'mongoose'

const simulationSchema = new Schema({
  newRevenue: { // nuevos_ingresos
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  newProfits: { // nuevas_ganancias
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  newLosses: { // nuevas_perdidas
    shortTerm: Number, // corto y largo plazo
    longTerm: Number
  },
  demandImpact: Number, // impacto_demanda
  offerImpact: Number, // impacto_oferta
  marketEquilibrium: {
    equilibriumPrice: Number,
    equilibriumQuantity: Number
  },
  elasticity: Number,
  production: {
    shortTerm: Number,
    longTerm: Number
  },
  scalePerformance: {
    constantPerformance: Number,
    decreasingPerformance: Number
  }

}, { timestamps: true })

export default model('Simulation', simulationSchema)
