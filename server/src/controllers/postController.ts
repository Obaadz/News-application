import { Request, Response } from "express";
import { PAGE_SIZE } from "../index";
import { JwtAuthExpressRequest } from "../middleware/jwtAuth";
import {
  deletePost,
  findPost,
  findPosts,
  getTotalPages,
  insertPost,
  updatePost,
} from "../services/post";
import { ERROR_MESSAGES } from "../types/enums";
import { Post } from "../types/post";
import { UserFromToken } from "../types/user";

export default class PostController {
  static async get(req: Request, res: Response) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const locale = req.query.locale as "en" | "ar";

    const posts = await findPosts({ locale }, undefined, {
      skip: page ? (page - 1) * PAGE_SIZE : 0,
      limit: limit ? limit : PAGE_SIZE,
      sort: { createAt: -1 },
    });

    res.status(201).send({ posts, totalPages: await getTotalPages(locale) });
  }

  static async getOne(req: Request, res: Response) {
    const postId = req.params.id;

    const post = await findPost({ _id: postId });

    res.status(201).send({ post });
  }

  static async create(request: JwtAuthExpressRequest<UserFromToken>, response: Response) {
    try {
      const post: Post = request.body.post,
        user = request.auth;

      if (!user?.email) throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL);
      if (!(post.author && post.content && post.image && post.title && post.locale))
        throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL);

      const dbPost = await insertPost(post).catch((err: any) => {
        if (err?.code === 11000) throw new Error(ERROR_MESSAGES.DUPLICATE);

        console.log("Insert Post:", err.message);
        throw new Error(ERROR_MESSAGES.INCORRECT_POST_INPUTS);
      });

      response.status(201).send("Post Created");
    } catch (err: any) {
      response.status(400).send(err.message || ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  static async update(request: JwtAuthExpressRequest<UserFromToken>, response: Response) {
    try {
      const post: Partial<Post & { _id: string }> = request.body.post,
        user = request.auth;

      if (!user?.email) throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL);

      const dbPost = await updatePost({ _id: post._id }, { $set: { ...post } }).catch(
        (err: any) => {
          if (err?.code === 11000) throw new Error(ERROR_MESSAGES.DUPLICATE);

          console.log("Update Post:", err.message);

          throw new Error(ERROR_MESSAGES.INCORRECT_POST_INPUTS);
        }
      );

      response.status(201).send("Post Updated");
    } catch (err: any) {
      response.status(400).send(err.message || ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  static async delete(request: JwtAuthExpressRequest<UserFromToken>, response: Response) {
    try {
      const postId = request.params.id,
        user = request.auth;

      if (!user?.email) throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL);

      const dbPost = await deletePost({ _id: postId }).catch((err: any) => {
        console.log("Delete Post:", err.message);

        throw new Error(ERROR_MESSAGES.INCORRECT_POST_INPUTS);
      });

      response.status(201).send("Post Deleted");
    } catch (err: any) {
      response.status(400).send(err.message || ERROR_MESSAGES.SERVER_ERROR);
    }
  }
}
