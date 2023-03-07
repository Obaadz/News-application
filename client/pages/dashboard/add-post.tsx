import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import DashboardHomeLayout from "../../layouts/dashboard";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { createPost } from "../../services/post";
import { getUserById } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import { Post } from "../../types/post";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
import { getLocale } from "../../utils/locale";
import { BACKEND_URL } from "../_app";

type Props = {};

const texts = {
  en: {
    dashboard_title: "Add New Post",
    title: "Title",
    content: "Content",
    image: "Image",
    featured: "Featured",
    author: "Author",
    required: "This field is required",
  },
  ar: {
    dashboard_title: "اضافة خبر جديد",
    title: "العنوان",
    content: "المحتوى",
    image: "الصورة",
    featured: "مميز",
    author: "الكاتب",
    required: "هذا الحقل مطلوب",
  },
};

const News: NextPage<Props> = () => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<Partial<Post>>();

  const handleFileUpload = async (event: any) => {
    const file = event.target?.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      register("image", {
        value: base64Data as string,
        required: locale ? texts[locale].required : "هذا الحقل مطلوب",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardHomeLayout>
      <div className="grow self-center py-3 text-center">
        <form
          className=" mx-auto flex w-1/2 flex-col items-center justify-center"
          onSubmit={handleSubmit(async (postForm) => {
            try {
              if (!postForm.image) {
                setError("image", {
                  type: "required",
                  message: locale ? texts[locale].required : "هذا الحقل مطلوب",
                });
                return;
              }

              console.log("POSTDATAX :", postForm);
              const response = await createPost(postForm);
            } catch (err: any) {
              console.error(err.message);
            }
          })}
        >
          <legend className="mb-5 select-none text-2xl">
            {locale ? texts[locale].dashboard_title : "اضافة خبر جديد"}
          </legend>
          <div className="flex w-full flex-col items-center">
            <label htmlFor="title" className="">
              {locale ? texts[locale].title : "العنوان"}
            </label>
            <input
              type="text"
              id="title"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              {...register("title", {
                required: locale ? texts[locale].required : "هذا الحقل مطلوب",
              })}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <label htmlFor="content" className="">
              {locale ? texts[locale].content : "المحتوى"}
            </label>
            <textarea
              id="content"
              className="h-28 w-full resize-none overflow-hidden rounded-md border-2 border-[#29668c] px-2"
              {...register("content", {
                required: locale ? texts[locale].required : "هذا الحقل مطلوب",
              })}
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <label htmlFor="image" className="">
              {locale ? texts[locale].image : "الصورة"}
            </label>
            <input
              type="file"
              id="image"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              onChange={handleFileUpload}
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <label htmlFor="featured" className="">
              {locale ? texts[locale].featured : "مميز"}
            </label>
            <input
              type="checkbox"
              id="featured"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              {...register("featured", {})}
            />
            {errors.featured && (
              <span className="text-red-500">{errors.featured.message}</span>
            )}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <label htmlFor="author" className="">
              {locale ? texts[locale].author : "الكاتب"}
            </label>
            <input
              type="text"
              id="author"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              {...register("author", {
                required: locale ? texts[locale].required : "هذا الحقل مطلوب",
              })}
            />
            {errors.author && (
              <span className="text-red-500">{errors.author.message}</span>
            )}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <button
              className="rounded-md bg-[#29668c] px-5 py-2 text-white"
              disabled={isSubmitting}
            >
              {locale ? texts[locale].dashboard_title : "اضافة خبر جديد"}
            </button>
          </div>
        </form>
      </div>
    </DashboardHomeLayout>
  );
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
