import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardHomeLayout from "../../layouts/dashboard";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getUserById } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
import { getLocale } from "../../utils/locale";

type Props = {};

const texts = {
  en: {
    dashboard_title: "Add New Post",
    title: "Title",
    content: "Content",
    image: "Image",
    featured: "Featured",
    author: "Author",
  },
  ar: {
    dashboard_title: "اضافة خبر جديد",
    title: "العنوان",
    content: "المحتوى",
    image: "الصورة",
    featured: "مميز",
    author: "الكاتب",
  },
};

const News: NextPage<Props> = () => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale || (getLocale() as any);

  return <DashboardHomeLayout>test</DashboardHomeLayout>;
};

export default News;

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

    return { props: { isLoggedIn: true, isAdmin: true, dbUser } };
  } catch (err: any) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard/login",
      },
    };
  }
};
