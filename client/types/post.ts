export type Post = {
  _id: string;
  author: string;
  title: string;
  image: string;
  content: string;
  featured?: boolean;
  locale: string;
  createAt: string;
};
