import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const LoginButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => signIn()}
      className="rounded-lg border-[3px] border-blue px-4 py-2"
    >
      <p className="text-blue font-medium text-sm">Login</p>
    </button>
  );
};

export default LoginButton;
