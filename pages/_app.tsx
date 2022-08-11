import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// Layout
import Layout from "../components/layouts/Layout";
// Providers
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

import AuthLayout from "../components/layouts/AuthLayout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const router = useRouter();
  // Use the layout defined at the page level, if available

  return (
    <SessionProvider session={session}>
      {router.route.search("auth") === 1 ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
