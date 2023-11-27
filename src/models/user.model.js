import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  projects: [{
    type: Schema.Types.ObjectId
  }]
}, { timestamps: true })

export default model('User', userSchema)
