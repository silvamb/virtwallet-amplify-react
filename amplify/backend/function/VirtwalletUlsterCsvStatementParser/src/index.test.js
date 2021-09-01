const mockParseCsvFile = jest.fn();
jest.mock("./ulster-csv-statement-parser", () => {
  return { parseCsvFile: mockParseCsvFile };
});

const mockTransactionFileParser = jest.fn();
jest.mock("virtwallet-lib/transaction-file-parser", () => {
  return { processRecord: mockTransactionFileParser };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { handler } = require("./index");

it("should process a single record", async () => {
  const event = {
    Records: [
      {
        s3: {
          bucket: {
            name: "virtwallet-account-files-bucket",
          },
          object: {
            key: "statement-files/ulster_csv/4306bec7-c283-42a8-b67d-04ec3f4dccf6/5694a155-960a-4553-8e92-c16dfaec0509/myfile.csv",
          },
        },
      },
    ],
  };

  mockParseCsvFile.mockReturnValueOnce([]);
  mockTransactionFileParser.mockReturnValueOnce([]);

  const results = await handler(event);
  expect(results).toEqual([[]]);
});
