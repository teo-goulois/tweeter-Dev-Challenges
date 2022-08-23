import { NextApiRequest, NextApiResponse } from "next";
import Server from "next/dist/server/base-server";
import Pusher from "pusher";
import getEnvVar from "../../../utils/getEnvVar";
import { Chat as ChatType } from "../../../types/typing";

const pusher = new Pusher({
  appId: getEnvVar("PUSHER_APP_ID"),
  key: getEnvVar("PUSHER_APP_KEY"),
  secret: getEnvVar("PUSHER_APP_SECRET"),
  cluster: getEnvVar("PUSHER_APP_CLUSTER"),
  encrypted: true,
});

type Data = {
  message: string;
  chat?: ChatType;
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = req.body;
  /* const sentimentScore = sentiment.analyze(data.text).score;
        console.log(sentimentScore, data.text); */

  pusher.trigger(`channel-${data.conversationID}`, "new-message", {
    chat: data,
  });
  res.end();
};

export default SocketHandler;
