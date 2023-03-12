import axios, { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PostHomeLanding from "../components/PostHomeLanding";
import MainLayout from "../layouts/MainLayout";
import { getPosts } from "../services/post";
import { Post } from "../types/post";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
type Props = {
  initialPosts: Post[];
  initialImportantPosts: Post[];
  initialLastPosts: Post[];
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

const Home: NextPage<Props> = ({ initialPosts, initialImportantPosts }) => {
  const [headingPosts, setHeadingPosts] = useState(initialPosts.slice(1, 4));
  const [importantPosts, setImportantPosts] = useState(initialImportantPosts);
  const [lastPosts, setLastPosts] = useState(initialPosts.slice(4));
  const router = useRouter();
  const locale: "en" | "ar" = router.locale as any;

  const handleClick = async () => {
    const { posts } = await getPosts({
      locale,
      page: 1,
      featured: 2,
    });

    setHeadingPosts(posts.slice(1, 4));
  };
  useEffect(() => {
    handleClick();
  }, [locale]);
  return (
    <MainLayout>
      <nav className="absolute z-20 flex w-full flex-wrap items-center justify-between gap-3 p-6">
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
      <div
        className="-z-20 h-screen w-full scale-[.93] bg-black bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: `url(${initialPosts[0].image})` }}
      ></div>
      <div className="absolute top-0 z-0 h-screen w-full rounded-sm bg-black opacity-80"></div>
      <main>
        <div className="relative -mt-96 lg:-mt-[26rem]">
          <div className="container mx-auto px-6 py-8">
            {/* <h3 className="text-2xl font-medium text-white">
              {texts[locale].lastNews} :
            </h3> */}
            <div className="mt-4">
              <div className="flex flex-wrap justify-center gap-3 lg:gap-0">
                {headingPosts.map((post) => (
                  <PostHomeLanding key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="mt-20 lg:mt-28">
          <div className="container mx-auto px-6 py-8">
            <div className="mt-4">
              <div className="flex flex-wrap justify-start gap-6">
                {importantPosts.length > 0 && (
                  <div className="w-2/5">
                    <h3 className="mb-4 text-2xl font-medium text-white">
                      {texts[locale].important} :
                    </h3>
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination]}
                      className="!mx-0 w-full"
                    >
                      <SwiperSlide>
                        <Link href={`/posts/${importantPosts[0]._id}`}>
                          <div className="relative">
                            <Image
                              src={importantPosts[0].image}
                              width={600}
                              height={600}
                              alt={importantPosts[0].title}
                              className="blur-sm"
                            />
                            <h4 className="absolute top-0 px-3 pt-3 text-xl font-bold text-white">
                              {importantPosts[0].title}
                            </h4>
                          </div>
                        </Link>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Link href={`/posts/${importantPosts[1]._id}`}>
                          <div className="relative">
                            <Image
                              src={importantPosts[1].image}
                              width={600}
                              height={600}
                              alt={importantPosts[1].title}
                              className="blur-sm"
                            />
                            <h4 className="absolute top-0 px-3 pt-3 text-xl font-bold text-white">
                              {importantPosts[1].title}
                            </h4>
                          </div>
                        </Link>
                      </SwiperSlide>
                      <SwiperSlide>
                        <Link href={`/posts/${importantPosts[2]._id}`}>
                          <div className="relative">
                            <Image
                              src={importantPosts[2].image}
                              width={600}
                              height={600}
                              alt={importantPosts[2].title}
                              className="blur-sm"
                            />
                            <h4 className="absolute top-0 px-3 pt-3 text-xl font-bold text-white">
                              {importantPosts[2].title}
                            </h4>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                )}
                <div className="grow text-white">
                  <h3 className="mb-4 text-2xl font-medium text-white">
                    {texts[locale].lastNews} :
                  </h3>
                  <div className="flex flex-col gap-5">
                    {lastPosts.map((post) => (
                      <div key={post._id} className="flex max-w-2xl gap-3">
                        <Image
                          src={post.image}
                          width={250}
                          height={250}
                          alt={post.title}
                        />
                        <Link href={`/posts/${post._id}`}>
                          <h4 className="font-semibold">{post.title}</h4>
                          <p className="mt-3 text-red-900">{post.author}</p>
                        </Link>
                      </div>
                    ))}
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

export default Home;

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const { posts: initialPosts }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
      featured: 2,
    }).catch((err: any) => {
      console.log(err);
    });
    const { posts: initialImportantPosts }: any = await getPosts({
      locale: (ctx.locale as "en" | "ar") || "ar",
      page: 1,
      featured: 1,
    }).catch((err: any) => {
      console.log(err);
    });

    return { props: { initialPosts, initialImportantPosts } };
  } catch (err: any) {
    return {
      props: {},
    };
  }
};
