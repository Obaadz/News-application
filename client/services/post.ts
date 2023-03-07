import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "../pages/_app";
import { User } from "../types/user";
import { Post } from "../types/post";
import getTokenFromCookies from "../utils/getTokenFromCookies";
import { ERROR_MESSAGES } from "../types/enums";

export async function createPost(post: Partial<Post>) {
  const token = getTokenFromCookies();

  if (!token) throw new Error(ERROR_MESSAGES.INCORRECT_TOKEN);

  const { data }: AxiosResponse = await axios.post(
    `${BACKEND_URL}/v1/posts`,
    {
      post,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
