import { useRouter } from "next/router";
import { FC } from "react";
import { Post } from "../types/post";
import Image from "next/image";
import { texts } from "../pages";

const PostHomeImportant: FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  return (
    <div className="w-full px-6 sm:w-1/4">
      <Image
        src={post.image}
        width={350}
        height={250}
        alt={post.title}
        className="mb-3 rounded-lg shadow-md"
      />
      <div className="flex items-center justify-between">
        <p
          className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-white"
          style={{ lineClamp: "2" }}
        >
          {post.content}
        </p>
      </div>
      {/* <div className="flex items-center justify-between">
        <span className="font-bold text-white">
          {texts[locale].author} : {post.author}
        </span>
      </div> */}
      <div className="flex items-center">
        <span className="font-bold text-white">
          {new Date(post.createAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default PostHomeImportant;
