import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostHomeLanding from "../components/PostHomeLanding";
import MainLayout from "../layouts/MainLayout";
import { getPosts } from "../services/post";
import { Post } from "../types/post";

type Props = {
  initialPosts: Post[];
};

export const texts = {
  en: {
    author: "Author",
    en: "English",
    ar: "Arabic",
    siteName: "Akhbary",
    home: "Home",
    mobiles: "Mobiles",
    pc: "PC",
    enterteinment: "Enterteinment",
    lastNews: "Last News",
    content: "Content",
  },
  ar: {
    author: "الكاتب",
    en: "الانجليزية",
    ar: "العربية",
    siteName: "اخباري",
    home: "الرئيسية",
    mobiles: "المحمول",
    pc: "الكمبيوتر",
    enterteinment: "الترفيه",
    lastNews: "اخر الاخبار",
    content: "المحتوى",
  },
};

const Home: NextPage<Props> = ({ initialPosts }) => {
  const [headingPosts, setHeadingPosts] = useState(initialPosts);
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  const handleClick = async () => {
    const { posts } = await getPosts({
      locale,
      page: 1,
      limit: 3,
    });
    console.log("fy ayh,", posts);
    setHeadingPosts(posts);
  };
  useEffect(() => {
    handleClick();
  }, [locale]);
  return (
    <MainLayout>
      <nav className="absolute z-20 flex w-full flex-wrap items-center justify-between gap-3 p-6">
        <div className="mx-auto flex flex-shrink-0 items-center text-black sm:mx-0">
          <span className="select-none text-4xl font-semibold tracking-tight">
            <Link href="/">{texts[locale].siteName}</Link>
          </span>
        </div>
        <div className="flex flex-shrink-0 grow items-center justify-center gap-5 text-black sm:mx-0 sm:justify-start">
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/">{texts[locale].home}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/mobiles">{texts[locale].mobiles}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/pc">{texts[locale].pc}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/enterteinment">{texts[locale].enterteinment}</Link>
          </span>
        </div>
        <div className="mx-auto flex flex-shrink-0 items-center justify-end gap-2 text-black sm:mx-0">
          <span className="sm:text-md select-none text-sm font-semibold tracking-tight">
            <Link href="/" locale="en">
              {texts[locale].en}
            </Link>
          </span>
          <span className="sm:text-md select-none text-sm font-semibold tracking-tight">
            <Link href="/" locale="ar">
              {texts[locale].ar}
            </Link>
          </span>
        </div>
      </nav>
      <div className="-z-20 h-screen w-full bg-dvd bg-cover"></div>
      <div className="absolute top-0 z-0 h-screen w-full bg-gray-900 opacity-30"></div>
      <main>
        <div className="relative -top-96">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-2xl font-medium text-gray-700">
              {texts[locale].lastNews} :
            </h3>
            <div className="mt-4">
              <div className="flex flex-wrap justify-center">
                {headingPosts.map((post) => (
                  <PostHomeLanding key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const { posts: initialPosts }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
      limit: 3,
    }).catch((err: any) => {
      console.log(err);
    });

    return { props: { initialPosts } };
  } catch (err: any) {
    return {
      props: {},
    };
  }
};
