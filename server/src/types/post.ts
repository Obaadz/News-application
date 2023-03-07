import { Document } from "mongoose";

export type Post = {
  author: string;
  title: string;
  image: string;
  content: string;
  featured: boolean;
  createAt: Date;
};

export interface IPostDocument extends Document, Post {}
