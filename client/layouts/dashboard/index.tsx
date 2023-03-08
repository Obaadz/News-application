import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import removeTokenFromCookies from "../../utils/removeTokenFromCookies";
import DashboardLayout from "./DashboardLayout";

type Props = {
  children: React.ReactNode;
};

const texts = {
  en: {
    dashboard: "Dashboard",
    news: "Display news",
    addNew: "Add new post",
    homePage: "Home page",
    logout: "Logout",
  },
  ar: {
    dashboard: "لوحة التحكم",
    news: "عرض الاخبار",
    addNew: "اضافة خبر",
    homePage: "الصفحة الرئيسية",
    logout: "تسجيل الخروج",
  },
};

const DashboardHomeLayout: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  return (
    <DashboardLayout>
      <div className="min-h-screen w-40 bg-[#161744] text-center">
        <h1 className="select-none pt-5 text-xl text-white">
          {locale ? texts[locale].dashboard : "لوحة التحكم"}
        </h1>
        <hr className="mt-3 border-[#29668c]" />
        <ul className="mt-3">
          <li>
            <Link
              href="/dashboard"
              className={`block py-3 text-lg text-[#bcbcbc] transition-colors duration-300 hover:text-[#ededed] ${
                router.pathname === "/dashboard" ? "text-[#ededed]" : ""
              }`}
            >
              {locale ? texts[locale].news : "عرض الاخبار"}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/add-post"
              className={`block py-3 text-lg text-[#bcbcbc] transition-colors duration-300 hover:text-[#ededed] ${
                router.pathname === "/dashboard/add-post" ? "text-[#ededed]" : ""
              }`}
            >
              {locale ? texts[locale].addNew : "اضافة خبر"}
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/login"
              className="block py-3 text-lg text-[#bcbcbc] transition-colors duration-300 hover:text-[#ededed]
              "
              onClick={() => {
                removeTokenFromCookies();
              }}
            >
              {locale ? texts[locale].logout : "تسجيل الخروج"}
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="block py-3 text-lg text-[#bcbcbc] transition-colors duration-300 hover:text-[#ededed]"
            >
              {locale ? texts[locale].homePage : "الصفحة الرئيسية"}
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </DashboardLayout>
  );
};

export default DashboardHomeLayout;
