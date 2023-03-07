import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { texts } from "./index";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { getUserById, loginUser } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import { Post } from "../../types/post";
import { User } from "../../types/user";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
import { getLocale } from "../../utils/locale";
import saveTokenToCookies from "../../utils/saveTokenToCookies";

type Props = {};

const Login: NextPage<Props> = () => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<Partial<User>>();

  return (
    <DashboardLayout>
      <div className="flex min-h-screen w-full items-center justify-center">
        <form
          className=" mx-auto flex w-1/2 flex-col items-center justify-center"
          onSubmit={handleSubmit(async (userForm) => {
            try {
              console.log("userDATAX :", userForm);
              const { token } = await loginUser(userForm);
              saveTokenToCookies(token);

              router.replace("/dashboard");
            } catch (err: any) {
              console.error(err.message);
            }
          })}
        >
          <legend className="mb-5 select-none text-2xl">
            {locale ? texts[locale].login_title : "تسجيل الدخول"}
          </legend>
          <div className="flex w-full flex-col items-center">
            <label htmlFor="email" className="">
              {locale ? texts[locale].email : "البريد الالكتروني"}
            </label>
            <input
              type="text"
              id="email"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              {...register("email", {
                required: locale ? texts[locale].required : "هذا الحقل مطلوب",
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <label htmlFor="password" className="">
              {locale ? texts[locale].password : "الكاتب"}
            </label>
            <input
              type="password"
              id="password"
              className="h-10 w-full rounded-md border-2 border-[#29668c] px-2"
              {...register("password", {
                required: locale ? texts[locale].required : "هذا الحقل مطلوب",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="mt-5 flex w-full flex-col items-center">
            <button
              className="rounded-md bg-[#29668c] px-5 py-2 text-white"
              disabled={isSubmitting}
            >
              {locale ? texts[locale].login_title : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Login;

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

    return {
      props: { isLoggedIn: true, isAdmin: true, dbUser },
      redirect: {
        destination: "/dashboard",
      },
    };
  } catch (err: any) {
    return {
      props: {},
    };
  }
};
