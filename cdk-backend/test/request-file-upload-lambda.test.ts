const mockS3 = {
  getSignedUrl: jest.fn().mockReturnThis(),
};

jest.mock('aws-sdk', () => {
  return { S3: jest.fn(() => mockS3) };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

import { handler }  from '../resources/functions/request-file-upload-lambda';

test('S3 URL generated', () => {

  mockS3.getSignedUrl.mockReturnValue("S3URL");

  const event = {
    typeName: "type",
    fieldName: "field",
    arguments: {
      input: {
        accountId: "account1",
        walletId: "wallet1",
        parserId: "parser",
        fileName: "file.csv"
      }
    }
  }

  const s3Url = handler(event);

  expect(s3Url).resolves.toEqual("S3URL");

  const expectedParams = {
    Bucket: "s3Bucket",
    Key: "statement-files/account1/wallet1/parsers/parser/file.csv",
    ContentType: "text/csv",
    StorageClass: "ONEZONE_IA",
    Metadata: {
        clientId: "anonymous"
    }
  };
  expect(mockS3.getSignedUrl).toHaveBeenCalledWith('putObject', expectedParams)
});

test('Error generating S3 URL', () => {

  mockS3.getSignedUrl.mockImplementation(() => {
    throw new Error("Error");
  });

  const event = {
    typeName: "type",
    fieldName: "field",
    arguments: {
      input: {
        accountId: "account1",
        walletId: "wallet1",
        parserId: "parser",
        fileName: "file.csv"
      }
    }
  }

  const s3Url = handler(event);

  expect(s3Url).rejects.toBe(new Error("Error"))
});