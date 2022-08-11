import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn, useSession } from "next-auth/react";
import React from "react";

type Props = {
  providers: Provider;
};

const SignIn = ({ providers }: Props) => {
  const { data: session } = useSession();
  console.log(session, "SESSION");

  return (
    <div>
      <>
        {Object.values(providers).map((provider) => (
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
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
