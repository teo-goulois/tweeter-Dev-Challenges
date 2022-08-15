import { profile } from "console";
import NextAuth, {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import credentials from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import {
  getUser,
  createUser,
  ReqUser,
  ResUser,
} from "../../../libs/users/users";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "80aef32a35771e6d48eb",
      clientSecret: "53b391cb63cacb08e66bcb62142e960abda23b97",
    }),
    GoogleProvider({
      clientId:
        "626850324834-ma6a0qhs51bisg0hice2609ssc6cp4q5.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  secret: "mysecret",
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return Promise.resolve(session);
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (user !== null) {
          (await getUser(user.id)) ??
            (await createUser(toReqUser(user, account)));
          const data = await getUser(user.id);
          setResUser(user, data as unknown as ResUser);
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

const toReqUser = (user: User, account: Account) => {
  const reqUser: ReqUser = {
    id: user.id,
    email: user.email,
    name: user.name.slice(0, 21),
    image: user.image,
    provider: account.provider,
  };
  return reqUser;
};

const setResUser = (user: User, resUser: ResUser) => {
  user._id = resUser._id;
  user.id = resUser.id;
  user.email = resUser.email;
  user.name = resUser.name;
  user.provider = resUser.provider;
  user.image = resUser.image;
  user.following = resUser.following;
  user.follower = resUser.follower;
};
