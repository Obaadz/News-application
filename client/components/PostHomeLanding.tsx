import { useRouter } from "next/router";
import { FC } from "react";
import { Post } from "../types/post";
import Image from "next/image";
import { texts } from "../pages";
import Link from "next/link";

const PostHomeLanding: FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  return (
    <div className="flex w-full flex-col items-center px-6 sm:w-1/2 md:w-2/5 lg:w-1/4">
      <Link href={`/posts/${post._id}`}>
        <Image
          src={post.image}
          width={350}
          height={250}
          alt={post.title}
          className="mb-3 rounded-lg shadow-md"
        />
      </Link>
      <div className="flex items-center justify-between">
        <Link href={`/posts/${post._id}`}>
          <p className="font-bold text-white">
            {post.content.length > 50 ? post.content.slice(0, 50) + "..." : post.content}
          </p>
        </Link>
      </div>
      {/* <div className="flex items-center justify-between">
        <span className="font-bold text-white">
          {texts[locale].author} : {post.author}
        </span>
      </div> */}
      <div className="mt-5 flex items-center">
        <Link href={`/posts/${post._id}`}>
          <span className="font-bold text-red-900">
            {post.author}
            {/* {new Date(post.createAt).toLocaleDateString()} */}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostHomeLanding;
