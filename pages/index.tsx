import type { GetServerSideProps, NextPage } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

type Props = {
  providers: Provider;
};

const Home = ({ providers }: Props) => {
  const { data: session } = useSession();
/*   console.log(session, 'SESSION');
  console.log(providers, 'PROVIDERs');
 */
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session?.user ? (
        <button onClick={() => signOut()}>log out</button>
      ) : (
        <div>
          <>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
