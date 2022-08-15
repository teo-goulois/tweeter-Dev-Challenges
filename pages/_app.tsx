import "../styles/globals.css";
import { ReactElement, ReactNode, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// Layout
import Layout from "../components/layouts/Layout";
// Providers
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { TweetProvider } from "../context/TweetProvider";
import { AuthProvider } from "../context/AuthProvider";
import AuthLayout from "../components/layouts/AuthLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import useSWR, { SWRConfig } from "swr";

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <TweetProvider>
            <Toaster />
            {router.route.search("auth") === 1 ? (
              <AuthLayout>
                <Component {...pageProps} />
              </AuthLayout>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </TweetProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
