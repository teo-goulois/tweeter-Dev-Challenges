import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const withAuth = (WrappedComponent: NextPage<{}, {}>) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const { data } = useSession();

      // If there is no access token we redirect to "/" page.
      if (!data) {
        Router.replace("/auth/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
