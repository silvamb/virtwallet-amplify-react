const fs = require("fs");

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { parseCsvFile } = require("./ulster-csv-statement-parser");

test("Test parsing C/L type transaction", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_CL_type.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2020-01-05",
    id: "202001060001",
    dt: "2020-01-06T00:00:00Z",
    description: "GET CASH",
    type: "C/L",
    balance: "367.15",
    value: "20.00",
    balanceType: "DEBIT",
    keyword: "GET CASH",
  });
});

test("Test parsing C/L type transaction starting with the date", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_CL_type_starting_with_date.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2020-01-04",
    id: "202001050001",
    dt: "2020-01-05T00:00:00Z",
    description: "CL WITH CARD",
    type: "C/L",
    balance: "387.15",
    value: "20.00",
    balanceType: "DEBIT",
    keyword: "CL WITH CARD",
  });
});

test("Test parsing POS type transaction with 3 lines in description", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_POS_with_3lines.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2020-01-04",
    id: "202001040001",
    dt: "2020-01-04T00:00:00Z",
    description: "POS 3 LINES , LINE 2 , LINE 3",
    type: "POS",
    balance: "387.30",
    value: "0.15",
    balanceType: "DEBIT",
    keyword: "POS 3 LINES",
  });
});

test("Test parsing POS type transaction with 2 lines in description", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_POS_with_2lines.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2020-01-03",
    id: "202001030001",
    dt: "2020-01-03T00:00:00Z",
    description: "POS 2 LINES , LINE 2",
    type: "POS",
    balance: "1887.90",
    value: "1500.60",
    balanceType: "DEBIT",
    keyword: "POS 2 LINES",
  });
});

test("Test parsing POS type transaction with 2 single in description", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_POS_with_single_line.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2020-01-02",
    id: "202001020001",
    dt: "2020-01-02T00:00:00Z",
    description: "POS 1 LINE",
    type: "POS",
    balance: "1988.00",
    value: "100.10",
    balanceType: "DEBIT",
    keyword: "POS 1 LINE",
  });
});

test("Test parsing POS type with day before", async () => {
  const transactions = await parseCsvFile(fs.createReadStream("../csv/test_POS_day_before.csv"));
  expect(transactions.length).toEqual(1);
  expect(transactions[0]).toEqual({
    date: "2019-12-31",
    id: "202001010001",
    dt: "2020-01-01T00:00:00Z",
    description: "POS DAY BEFORE",
    type: "POS",
    balance: "1998.51",
    value: "10.51",
    balanceType: "DEBIT",
    keyword: "POS DAY BEFORE",
  });
});
