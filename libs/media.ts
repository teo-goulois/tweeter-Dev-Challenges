import path from "path";
import fs from "fs";
import { s3 } from "./awsS3Client";
import AWS from "aws-sdk";
import getEnvVar from "../utils/getEnvVar";

export const uploadImage = async (file2upload: {
  filepath: string;
  size: number;
}): Promise<OutputImage> => {

  if (file2upload.size > 10 * 1024 * 1024) {
    throw new Error("the uploaded image should be less than 10mb");
  }
  const file = file2upload.filepath;

  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: getEnvVar("AWS_BUCKET_NAME"),
    Key: path.basename(file),
    Body: fileStream,
  };
  // create bucket
  // await CreateBucket();
  // upload image
  try {
    const upload = new AWS.S3.ManagedUpload({
      params: uploadParams,
      service: s3,
      partSize: 5 * 1024 * 1024,

      queueSize: 1,
    });
    AWS.S3.ManagedUpload.maxTotalParts = 10 * 1024 * 1024;
    upload.on("httpUploadProgress", (progress) => {
      console.log(progress, "progress");
    });
    const promise = await upload.promise();
    return {
      url: promise.Location,
    };
  } catch (err) {
    throw new Error(err as string);
  }
};

export interface OutputImage {
  url: string;
}
