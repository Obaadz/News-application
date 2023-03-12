import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import DashboardHomeLayout from "../../layouts/dashboard";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { deletePost, getPosts } from "../../services/post";
import { getUserById } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import { Post } from "../../types/post";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
import { getLocale } from "../../utils/locale";

type Props = {
  initialPosts: Post[];
  totalPages: number;
};

export const texts = {
  en: {
    login_title: "Login",
    email: "Email",
    password: "Password",
    required: "This field is required",
    dashboard_title: "Add New Post",
    title: "Title",
    content: "Content",
    image: "Image",
    featured: "Featured",
    author: "Author",
    locale: "Post language",
    en: "English",
    ar: "Arabic",
    deletePost: "Delete Post",
    editPost: "Edit Post",
    oldImage: "Old Image",
    successEdit: "Post updated successfully",
  },
  ar: {
    login_title: "تسجيل الدخول",
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    required: "هذا الحقل مطلوب",
    dashboard_title: "اضافة خبر جديد",
    title: "العنوان",
    content: "المحتوى",
    image: "الصورة",
    featured: "مميز",
    author: "الكاتب",
    locale: "لغة الخبر",
    en: "الانجليزية",
    ar: "العربية",
    deletePost: "حذف الخبر",
    editPost: "تعديل الخبر",
    oldImage: "الصورة القديمة",
    successEdit: "تم تعديل الخبر بنجاح",
  },
};

const PostComp: FC<{ post: Post; setPosts: any }> = ({ post, setPosts }) => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  return (
    <div className="flex gap-3 p-2">
      <Image src={post.image} width={400} height={400} alt={post.title} />
      <div className="flex flex-col gap-2">
        <h2>
          {texts[locale].title}: {post.title}
        </h2>
        <p>
          {texts[locale].content}: {post.content}
        </p>
        <p>
          {texts[locale].author}: {post.author}
        </p>
        <div className="flex gap-3">
          <button
            className="rounded-md bg-[#29668c] px-2 py-1 text-white"
            onClick={async () => {
              await deletePost({ _id: post._id });
              setPosts((prev: Post[]) =>
                prev.filter((prevpost) => prevpost._id !== post._id)
              );
            }}
          >
            {locale ? texts[locale].deletePost : "حذف الخبر"}
          </button>

          <button
            className="rounded-md bg-[#29668c] px-2 py-1 text-white"
            onClick={() => {
              console.log(post._id);
              router.push(`/dashboard/posts/${post._id}`);
            }}
          >
            {locale ? texts[locale].editPost : "تعديل الخبر"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: NextPage<Props> = ({ initialPosts, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;
  const handlePosts = async (page: number) => {
    const { posts } = await getPosts({
      locale,
      page,
      featured: 2,
    });

    setPosts(page > 1 ? posts : initialPosts);
  };
  return (
    <DashboardHomeLayout>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostComp key={post._id} post={post} setPosts={setPosts} />
        ))}
        <div className="flex gap-3 p-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <span
              key={page}
              className={`cursor-pointer bg-slate-600 px-1 text-xl ${
                currentPage === page ? "text-red-900" : ""
              }`}
              onClick={async () => {
                setCurrentPage(page);
                await handlePosts(page);
              }}
            >
              {page}
            </span>
          ))}
        </div>
      </div>
    </DashboardHomeLayout>
  );
};

export default Dashboard;

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const cookiesString = ctx.req?.headers?.cookie;

    if (!cookiesString) throw new Error(ERROR_MESSAGES.SERVER_ERROR);

    const cookies = getCookiesObjectFromString(cookiesString);

    if (!cookies.token) throw new Error(ERROR_MESSAGES.NOT_LOGGED_IN);

    const dbUser = await getUserById({
      token: cookies.token,
    });

    if (!dbUser) throw new Error(ERROR_MESSAGES.INCORRECT_TOKEN);
    const { posts: initialPosts, totalPages }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
    }).catch((err: any) => {
      console.log(err);
    });

    return {
      props: { isLoggedIn: true, isAdmin: true, dbUser, initialPosts, totalPages },
    };
  } catch (err: any) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard/login",
      },
    };
  }
};
