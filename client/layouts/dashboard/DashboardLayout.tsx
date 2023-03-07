import type { NextPage } from "next";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>لوحة التحكم</title>
        <meta name="description" content="لوحة تحكم الموقع الاخباري" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="flex h-max bg-[#ffffff]">{children}</div>
    </>
  );
};

export default DashboardLayout;
