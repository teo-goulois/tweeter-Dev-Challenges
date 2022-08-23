// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Conversation as ConvType,
} from "../../../types/typing";
import dbConnect from "../../../libs/dbConnect";
import Conversation from "../../../models/Conversation";

type Data = {
  message: string;
  conversation?: ConvType;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const data: ConvType = JSON.parse(req.body);

  try {
    var newConversation = new Conversation({
      author: data.author,
      desc: data.desc,
      name: data.name,
      members: data.members,
    });
    // Create new user
    var createdConversation = await newConversation.save();

    res.status(200).json({
      message: "new Channel created",
      conversation: createdConversation as unknown as ConvType,
    });
  } catch (err) {
    res.status(500).json({ message: "an error occured please try later" });
  }
}
