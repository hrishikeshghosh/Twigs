import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: { type: String, required: true },
  creatorID: { type: String, required: true },
  creatorName: { type: String, default:"" },
  creatorImage: { type: String, default:"" },
  creatorRole: { type: String, default:"" },
  type: { type: String, required: true },
  media: { type: String },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
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
  createdAt: { type: Date, default: new Date() },
  tags: [String],
});

const POSTMODEL = mongoose.model("Posts", postSchema);

export default POSTMODEL;
