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
import AuthLayout from "../components/layouts/AuthLayout";

import { SWRConfig } from "swr";
import ChatLayout from "../components/layouts/ChatLayout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  if (typeof window !== "undefined") {
    const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener("beforeunload", () => {
      const appCache = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem("app-cache", appCache);
    });

    // We still use the map for write & read for performance.
    return map;
  }
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Toaster />
        {router.route.search("auth") === 1 ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <Layout>
            {router.route.search("chat") === 1 ? (
              <ChatLayout>
                <Component {...pageProps} />
              </ChatLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        )}
      </SWRConfig>
    </SessionProvider>
  );
}
