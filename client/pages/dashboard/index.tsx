import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardHomeLayout from "../../layouts/dashboard";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getPosts } from "../../services/post";
import { getUserById } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import { Post } from "../../types/post";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
import { getLocale } from "../../utils/locale";

type Props = {
  initialPosts: Post[];
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
  },
};

const Dashboard: NextPage<Props> = ({ initialPosts }) => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  return (
    <DashboardHomeLayout>{initialPosts && initialPosts[0].content}</DashboardHomeLayout>
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
    const { posts: initialPosts }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
    }).catch((err: any) => {
      console.log(err);
    });

    return { props: { isLoggedIn: true, isAdmin: true, dbUser, initialPosts } };
  } catch (err: any) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard/login",
      },
    };
  }
};
