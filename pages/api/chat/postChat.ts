// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Chat as ChatType } from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Chat from "../../../models/Chat";

type Data = {
  message: string;
  chat?: ChatType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const data: ChatType = JSON.parse(req.body);
  console.log("POST chat ", data);

  try {
    var newChat = new Chat({
      conversationID: data.conversationID,
      images: data.images,
      author: data.userID,
      text: data.text,
    });
    // Create new user
    var createdChat = await newChat.save();

    res.status(200).json({
      message: "chat posted",
      chat: createdChat as unknown as ChatType,
    });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
