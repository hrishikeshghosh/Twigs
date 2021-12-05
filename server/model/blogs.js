import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    rerquired: true,
  },

  creatorID: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorImage: { type: String, required: true },
  creatorRole: { type: String, required: true },

  content: {
    type: String,
    required: true,
  },
  media: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [
      {
        userID: { type: String },
        text: { type: String },
        createdAt: { type: Date, default: new Date() },
        comment_likes: { type: [String], default: [] },
        comment_dislikes: { type: [String], default: [] },
        replies: {
          type: [
            {
              reply_userID: { type: String },
              reply_text: { type: String },
              reply_createdAt: { type: Date, default: new Date() },
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  tags: [String],
});

const BLOGMODEL = mongoose.model("BLOGS", blogSchema);

export default BLOGMODEL;
