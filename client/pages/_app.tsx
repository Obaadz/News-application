import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export const BACKEND_URL = process.env.BACKEND_URL as string;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <Head>
        <title>NEWS</title>
        <meta name="description" content="a very well news" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <div dir={locale === "en" ? "ltr" : "rtl"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
