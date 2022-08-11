import { connectToDatabase } from "../mongodb";
import { User, Account } from "next-auth";

export type ReqUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  provider: string;
};

export type userTokens = {
  id: string;
  firebaseUid: string;
};

export type ResUser = ReqUser & {
  isAdmin: boolean;
};

export const getUser = async (id: string) => {
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ id });
  console.log(user, "USER");
  return user;
};

export const createUser = async (user: ReqUser) => {
  const { db } = await connectToDatabase();
  const response = db.collection("users").insertOne({
    ...user,
    completed: false,
    createdAt: new Date(),
  });
};
