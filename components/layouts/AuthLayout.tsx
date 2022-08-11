import { useRouter } from "next/router";
import React from "react";
import Logo from "../navbar/Logo";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
    const router = useRouter()
  return (
    <div className="bg-gray3 min-h-screen flex items-center justify-center ">
      <nav className="p-4 flex justify-between items-center fixed w-full top-0">
        <Logo />
        <button onClick={() => router.back()} className="rounded-lg border-[3px] border-blue px-6 py-2">
            <p className="text-blue font-medium">Back</p>
        </button>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
