import { ERROR_MESSAGES } from "../types/enums";
import type { IPostDocument, Post } from "../types/post";
import PostModel from "../models/post";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { PAGE_SIZE } from "../index";

export async function findPost(
  query: FilterQuery<IPostDocument>,
  selectedItems?: string | string[]
) {
  const dbPost: IPostDocument | null = await PostModel.findOne(query).select(
    selectedItems ? selectedItems : undefined
  );

  if (!dbPost) throw new Error(ERROR_MESSAGES.ERROR_ON_FINDING_POST);

  return dbPost;
}

export async function findPosts(
  query: FilterQuery<IPostDocument>,
  selectedItems?: string | string[],
  queryOptions?: QueryOptions<IPostDocument>
) {
  const dbPost: IPostDocument[] = await PostModel.find(
    query,
    undefined,
    queryOptions
  ).select(selectedItems ? selectedItems : undefined);

  if (!dbPost) throw new Error(ERROR_MESSAGES.ERROR_ON_FINDING_POST);

  return dbPost;
}

export async function insertPost(post: Post) {
  const dbPost: IPostDocument = new PostModel<Post>({
    ...post,
  });

  await dbPost.save();

  return findPost({ _id: dbPost._id });
}

export async function updatePost(
  query: FilterQuery<IPostDocument>,
  update: UpdateQuery<IPostDocument>
) {
  await PostModel.updateOne(query, update);
}

export async function deletePost(query: FilterQuery<IPostDocument>) {
  await PostModel.deleteOne(query, { $unset: { title: 1 } });
}

export async function getTotalPages(locale: "en" | "ar") {
  const count = await PostModel.countDocuments({ locale });

  return Math.ceil(count / PAGE_SIZE);
}
