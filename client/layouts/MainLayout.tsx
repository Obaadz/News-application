import type { NextPage } from "next";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const MainLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>الموقع الاخباري</title>
        <meta name="description" content="موقع اخباري لعرض الاخبار" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="h-max bg-[#ffffff] ltr:font-barlow rtl:font-cairo">{children}</div>
    </>
  );
};

export default MainLayout;
