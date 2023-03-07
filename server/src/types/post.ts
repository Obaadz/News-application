import { Document } from "mongoose";

export type Post = {
  author: string;
  title: string;
  image: string;
  content: string;
  featured: boolean;
  createAt: Date;
  locale: "en" | "ar";
};

export interface IPostDocument extends Document, Post {}
