import mongoose from 'mongoose'

const draftSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  creatorID: { type: String, required: true },
  type: { type: String, required: true },
  media: { type: String, default: '' },
  createdAt: { type: Date, default: new Date() },
  tags: { type: [String], default: [] }
})

const DRAFTMODEL = mongoose.model('Drafts', draftSchema)

export default DRAFTMODEL
