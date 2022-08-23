import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Provider } from "next-auth/providers";
import { unstable_getServerSession } from "next-auth";
import {
  getProviders,
  signIn,
  useSession,
  getCsrfToken,
} from "next-auth/react";

// Type
import { authOptions } from "../api/auth/[...nextauth]";
import { LogosGoogleIcon, MdiGithub } from "../../icons/Icons";

type Props = {
  providers: Provider;
  csrfToken: string | undefined;
};

const Login = ({ providers, csrfToken }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [forgetPassword, setForgetPassword] = useState<boolean>(false);

  return (
    <div className="max-w-[400px] ">
      <h2 className="font-semibold text-2xl text-blue py-2">Login</h2>
      <p>
        Login to start posting and to get connected with People all over the
        world!
      </p>

      <form action="" className="grid grid-rows-1 gap-4 my-2">
        {/*  <div className="mt-auto mb-auto">
          <label className="block font-medium text-sm" htmlFor="Email">
            Email
          </label>
          <input
            type="email"
            className="bg-gray2 border border-gray/30 rounded-lg w-full p-2 outline-gray"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block font-medium text-sm" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            className="bg-gray2 border border-gray/30 rounded-lg w-full p-2 outline-gray"
            placeholder="Your Password"
          />
          <button
            type="button"
            onClick={() => setForgetPassword((prev) => !prev)}
            className="text-blue font-medium text-sm cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
        <div>
          <button
            onClick={() => signIn("github")}
            className="w-full bg-blue py-2 rounded-lg"
          >
            <p className="text-white">Login</p>
          </button>
          <p className="text-sm mt-2 text-primary">
            You don't have an account yet?{" "}
            <Link href={"/auth/signup"}>
              <a className="text-blue/70 font-medium"> Signup now</a>
            </Link>{" "}
          </p>
        </div>

        <p className="text-center">or signin with</p> */}
        <div className="flex  items-center justify-center">
          <>
            {Object.values(providers).map((provider) => {

              return (
                <div key={provider.name}>
                  <button
                    type="button"
                    className="bg-white rounded-lg px-4 py-2 m-2 shadow-sm hover:shadow"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    {provider.name === "Google" ? (
                      <div className="h-12 mb-2">
                        {" "}
                        <LogosGoogleIcon />
                      </div>
                    ) : (
                      <div className="h-12 mb-2">
                        {" "}
                        <MdiGithub />
                      </div>
                    )}{" "}
                    {provider.name}
                  </button>
                </div>
              );
            })}
          </>
        </div>
      </form>

      {forgetPassword && (
        <>
          {/* forget password */}
          <div className="bg-gray4/70 w-full h-1 rounded-lg"></div>
          <div>
            <h2 className="font-semibold text-2xl text-blue py-2">
              Reset Password
            </h2>
            <p className="text-primary ">
              Enter your Email that is connected to your account to get a new
              Password
            </p>
          </div>
          <form action="">
            <div className="mt-auto mb-auto py-4">
              <label className="block font-medium text-sm" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                className="bg-gray2 border border-gray/30 rounded-lg w-full p-2 outline-gray"
                placeholder="Your Email"
              />
            </div>
            <button type="submit" className="w-full bg-blue py-2 rounded-lg">
              <p className="text-white">Reset Password</p>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (csrfToken) {
    return {
      props: { providers, csrfToken },
    };
  }
  return {
    props: { providers },
  };
};
