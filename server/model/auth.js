import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  role: { type: String, default: '' },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  contents: { type: [String], default: [] },
  profileDesc: { type: String, default: '' },
  designation: { type: String, default: 'Beginner' },
  verified: { type: Boolean, default: false },
  ReadLater: { type: [String], default: [] },
  library: { type: [String], default: [] },
  id: { type: String }
})

const AUTHMODEL = mongoose.model('USERS', userSchema)

export default AUTHMODEL
