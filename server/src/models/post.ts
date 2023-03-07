import mongoose, { Schema } from "mongoose";
import { IPostDocument } from "../types/post";

export const postSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  featured: { type: Boolean, default: false },
  locale: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.posts || mongoose.model<IPostDocument>("posts", postSchema);

export default Post;
