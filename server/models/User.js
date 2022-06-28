import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  imageUrl: { type: String },
  roles: [{ type: String, ref: 'Role' }],
})

export default mongoose.model('User', User)
