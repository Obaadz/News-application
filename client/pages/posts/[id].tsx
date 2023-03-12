import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import PostHomeLanding from "../../components/PostHomeLanding";
import MainLayout from "../../layouts/MainLayout";
import { getPosts, getPost } from "../../services/post";
import { getUserById } from "../../services/user";
import { ERROR_MESSAGES } from "../../types/enums";
import { Post } from "../../types/post";
import getCookiesObjectFromString from "../../utils/getCookiesObjectFromString";
// import "swiper/css/navigation";
type Props = {
  initialPosts: Post[];
  initialLastPosts: Post[];
  totalPages: number;
  neededPost: Post;
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
    whoWe: "Who We Are",
    important: "Exclusive news",
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
    whoWe: "من نحن",
    important: "اخبار حصريه",
  },
};

const PostPage: NextPage<Props> = ({ initialPosts, totalPages, neededPost }) => {
  const [lastPosts, setLastPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  const handleClick = async () => {
    const { posts } = await getPosts({
      locale,
      page: 1,
      featured: 2,
    });
  };

  const handleLastPosts = async (page: number) => {
    const { posts } = await getPosts({
      locale,
      page,
      featured: 2,
    });

    setLastPosts(page > 1 ? posts : initialPosts.slice(4));
  };

  useEffect(() => {
    handleClick();
  }, [locale]);
  return (
    <MainLayout>
      <nav className="z-20 flex w-full flex-wrap items-center justify-between gap-3 p-6">
        <div className="mx-auto flex flex-shrink-0 items-center text-white sm:mx-0">
          <span className="select-none text-4xl font-semibold tracking-tight">
            <Link href="/">{texts[locale].siteName}</Link>
          </span>
        </div>
        <div className="flex flex-shrink-0 grow items-center justify-center gap-5 text-white sm:mx-0 sm:justify-start">
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/">{texts[locale].home}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/#who-we">{texts[locale].whoWe}</Link>
          </span>
          {/* <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/mobiles">{texts[locale].mobiles}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/pc">{texts[locale].pc}</Link>
          </span>
          <span className="text-md select-none font-semibold tracking-tight sm:text-lg md:text-xl">
            <Link href="/categories/enterteinment">{texts[locale].enterteinment}</Link>
          </span> */}
        </div>
        <div className="mx-auto flex flex-shrink-0 items-center justify-end gap-2 text-white sm:mx-0">
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
      <main>
        <section>
          <div className="container mx-auto px-6 py-4">
            <Image
              className="mx-auto mb-6 rounded-sm"
              src={neededPost.image}
              width={550}
              height={350}
              alt={neededPost.title}
            />
            <div className="lg:w-2/3">
              <h1 className="mb-4 select-none text-3xl font-medium text-white">
                {neededPost.title}
              </h1>
              <p className="text-white">{neededPost.content}</p>
              <div className="mt-3 text-white">
                <span className="text-red-900">{neededPost.author}</span> -{" "}
                <span className="text-red-900">
                  {new Date(neededPost.createAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 lg:mt-8">
          <div className="container mx-auto px-6 py-8">
            <div className="mt-4">
              <div className="flex flex-wrap justify-start gap-6">
                <div className="grow text-white">
                  <h3 className="mb-4 select-none text-2xl font-medium text-white">
                    {texts[locale].lastNews}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {lastPosts.map((post) => (
                      <Link key={post._id} href={`/posts/${post._id}`}>
                        <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">
                          <Image
                            src={post.image}
                            width={250}
                            height={250}
                            alt={post.title}
                          />
                          <div>
                            <h4 className="font-semibold">{post.title}</h4>
                            <p className="mt-3 text-red-900">{post.author}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="flex max-w-2xl justify-end gap-3">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <span
                          key={page}
                          className={`cursor-pointer bg-slate-600 px-1 text-xl ${
                            currentPage === page ? "text-red-900" : ""
                          }`}
                          onClick={async () => {
                            setCurrentPage(page);
                            await handleLastPosts(page);
                          }}
                        >
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default PostPage;

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const { post: neededPost } = await getPost({
      _id: ctx.query.id as string,
    });

    const { posts: initialPosts, totalPages }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
      featured: 2,
    }).catch((err: any) => {
      console.log(err);
    });

    return { props: { initialPosts, totalPages, neededPost } };
  } catch (err: any) {
    return {
      props: {},
    };
  }
};
