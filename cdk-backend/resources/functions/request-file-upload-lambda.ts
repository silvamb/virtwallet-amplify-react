import { S3 } from 'aws-sdk';
const s3 = new S3();

type RequestFileUploadInput = {
  accountId: string;
  walletId: string;
  parserId: string;
  fileName: string;
}

type AppSyncEvent = {
  typeName: string;
  fieldName: string;
  arguments: {
    input: RequestFileUploadInput
  };
  identity?: {
    sub: string;
    username: string;
  };
};

export async function handler(event: AppSyncEvent): Promise<string> {

  // Log the event to debug the application during development
  console.log(event);

  const input = event.arguments?.input;
  
  console.log("Creating a S3 URL for input", input);

  const s3Bucket = process.env.ACCOUNT_FILES_BUCKET;
  const s3Key = `statement-files/${input.accountId}/${input.walletId}/parsers/${input.parserId}/${input.fileName}`;

  const s3Params = {
      Bucket: s3Bucket,
      Key: s3Key,
      ContentType: "text/csv",
      StorageClass: "ONEZONE_IA",
      Metadata: {
          clientId: "anonymous"
      }
  };

  console.log("Creating signed URL with params", s3Params);

  const url = s3.getSignedUrl('putObject', s3Params);
  console.log('URL generated ', url);

  return url;
}
