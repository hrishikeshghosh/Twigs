import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  postID: { type: String, default: "" },
  title: { type: String, default: "" },
  author: { type: String, default: "" },
  tags: { type: [String], default: [] },
  savedBy: { type: String, default: "" },
  savedAt: { type: Date, default: new Date() },
});

const LIBRARYMODEL = mongoose.model("Library", librarySchema);

export default LIBRARYMODEL;
