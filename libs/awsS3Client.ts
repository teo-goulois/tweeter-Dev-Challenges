import getEnvVar from "../utils/getEnvVar";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: getEnvVar("AWS_REGION"),
  accessKeyId: getEnvVar("AWS_KEY_ID"),
  secretAccessKey: getEnvVar("AWS_SECRET_KEY"),
  signatureVersion: "v4",
});

export { s3 };
