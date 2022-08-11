import { useRouter } from "next/router";
import React from "react";

const SignupButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/auth/signup")}
      className="rounded-lg border-2 border-blue bg-blue px-4 py-2"
    >
      <p className="text-white font-medium text-sm">Signup</p>
    </button>
  );
};

export default SignupButton;
