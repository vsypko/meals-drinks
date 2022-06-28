import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Role = new Schema({
  value: { type: String, unique: true, default: 'USER' },
})

export default mongoose.model('Role', Role)
