// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { uploadImage } from "../../../libs/media";

type Data = {
  data: {
    url: string;
  } | null;
  error: string | null;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const form = formidable();
    
    new Promise((resolve, reject) => {
      resolve(
        form.parse(req, async (err, filed, files) => {
          if (!files.file) {
            res.status(400).json({
              data: null,
              error: "no files uploaded",
            });
          }

          try {

            // @ts-ignore
            const response = await uploadImage(files.file[0]);
            res.status(200).json({
              data: {
                url: response.url,
              },
              error: null,
            });
          } catch (e: unknown) {
            let error = (e as Error).message;

            res.status(500).json({
              data: null,
              error: error,
            });
          }
        })
      );
    });
  }
}

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
