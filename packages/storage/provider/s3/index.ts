import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import type {
  GetSignedUploadUrlHandler,
  GetSignedUrlHander,
} from "../../types";

let s3Client: S3Client | null = null;

const getS3Client = () => {
  if (s3Client) {
    return s3Client;
  }

  const s3Endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT!;
  if (!s3Endpoint) {
    throw new Error("Missing env variable NEXT_PUBLIC_S3_ENDPOINT");
  }

  const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID!;
  if (!s3AccessKeyId) {
    throw new Error("Missing env variable S3_ACCESS_KEY_ID");
  }

  const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
  if (!s3SecretAccessKey) {
    throw new Error("Missing env variable S3_SECRET_ACCESS_KEY");
  }

  const s3BucketRegion = process.env.S3_BUCKET_REGION!;
  if (!s3BucketRegion) {
    throw new Error("Missing env variable S3_BUCKET_REGION");
  }

  s3Client = new S3Client({
    region: s3BucketRegion,
    // endpoint: s3Endpoint,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey,
    },
  });

  return s3Client;
};

export const getSignedUploadUrl: GetSignedUploadUrlHandler = async (
  path,
  { bucket },
) => {
  const s3Client = getS3Client();
  try {
    return await getS3SignedUrl(
      s3Client,
      new PutObjectCommand({ Bucket: bucket, Key: path }),
      {
        expiresIn: 3600,
      },
    );
  } catch (e) {
    console.error(e);
    throw new Error("Could not get signed upload url");
  }
};

export const getSignedUrl: GetSignedUrlHander = async (
  path,
  { bucket, expiresIn },
) => {
  const s3Client = getS3Client();
  try {
    return getS3SignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: bucket, Key: path }),
      { expiresIn },
    );
  } catch (e) {
    console.error(e);
    throw new Error("Could not get signed url");
  }
};
