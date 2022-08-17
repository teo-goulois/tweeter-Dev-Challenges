// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FormValues } from "../../../components/profile/EditModal";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: FormValues = JSON.parse(req.body);

  res.status(200).json({ message: "John Doe" });
}
