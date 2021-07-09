const log = require("loglevel");
log.setLevel("trace");

const csv = require("csv-parser");
const moment = require("moment");

const stream = require("stream");
const util = require("util");
const finished = util.promisify(stream.finished);

const DEBIT_BALANCE_TYPE = "DEBIT";
const CREDIT_BALANCE_TYPE = "CREDIT";

const POS_TX_REGEX = /^(\d{4}) (\d\d[A-Z]{3}\d\d) /;
const CL_REGEX = /(.*) (\d\d[A-Z]{3})$/;

exports.parseCsvFile = async (s3Stream) => {
  const transactions = await readTransactions(s3Stream);

  log.info(`Total transactions parsed [${transactions.length}]`);

  return transactions;
};

async function readTransactions(fileStream) {
  const results = [];
  const dayCounter = new Map();
  fileStream
    .pipe(csv({ headers: false, skipLines: 3 }))
    .on("data", (data) => results.push(parseLine(data, dayCounter)))
    .on("end", () => {
      log.info("Finished reading CSV");
    });

  await finished(fileStream);

  log.debug("Finished parsing transactions", { results });
  return results;
}

function parseLine(fields, dayCounter) {
  const txRawPostDate = moment.utc(fields[0], "DD/MM/YYYY", true);

  const transaction = {
    date: txRawPostDate.format("YYYY-MM-DD"),
    id: getTxId(txRawPostDate, dayCounter),
    dt: txRawPostDate.format(),
    description: removeTrailingQuote(fields[2]),
    type: fields[1],
    balance: fields[4],
  };
  setValue(transaction, fields[3]);

  if (transaction.type == "POS") {
    transformPosTx(transaction);
  }

  if (transaction.type == "C/L") {
    transformCLTx(transaction);
  }

  const keywordEnd = transaction.description.indexOf(",");

  if (keywordEnd < 0) {
    transaction.keyword = transaction.description.trim();
  } else {
    transaction.keyword = transaction.description
      .substring(0, keywordEnd)
      .trim();
  }

  return transaction;
}

function getTxId(txRawDate, dayCounter) {
  const txDateKey = txRawDate.format("YYYYMMDD");

  const i = dayCounter.get(txDateKey) || 0;
  dayCounter.set(txDateKey, i + 1);

  const txIndex = String(i + 1).padStart(4, "0");

  return txDateKey.concat(txIndex);
}

function removeTrailingQuote(str) {
  return str.charAt(0) === "'" ? str.substring(1) : str;
}

function setValue(transaction, value) {
  if (value.charAt(0) === "-") {
    transaction.value = value.substring(1);
    transaction.balanceType = DEBIT_BALANCE_TYPE;
  } else {
    transaction.value = value;
    transaction.balanceType = CREDIT_BALANCE_TYPE;
  }
}

function transformPosTx(transaction) {
  if (!POS_TX_REGEX.test(transaction.description)) {
    log.info(
      `POS transaction ${transaction.id} does not match expected pattern: ${transaction.description}`
    );
    return;
  }

  const card = transaction.description.substring(0, 4);
  log.debug(`Card used in POS: [${card}] for transaction ${transaction.id}`);

  const originalTxDateStr = transaction.description.substring(5, 12);
  const originalTxDate = moment(originalTxDateStr, "DDMMMYY", "en-GB", true);
  transaction.date = originalTxDate.format("YYYY-MM-DD");
  log.debug(
    `Original date from transaction: ${transaction.date} for transaction ${transaction.id}`
  );

  const txDescStart = transaction.description.indexOf(",");
  transaction.description = transaction.description.substring(txDescStart + 1).trim();
}

function transformCLTx(transaction) {
  if (POS_TX_REGEX.test(transaction.description)) {
    transformPosTx(transaction);
    return;
  }

  if (!CL_REGEX.test(transaction.description)) {
    log.warn(
      `CL transaction does not match expected pattern: ${transaction.description} for transaction ${transaction.id}`
    );
    return;
  }

  const matches = transaction.description.match(CL_REGEX);

  // Get the year from the current tx date
  const year = transaction.date.substring(0, 4);

  // The second matched group should be a date in format DDMM.
  const originalTxDateStr = matches[2].concat(year);
  log.debug(
    `CL original tx date: [${originalTxDateStr}] for transaction ${transaction.id}`
  );

  const originalTxDate = moment(originalTxDateStr, "DDMMMYYYY", "en-GB", true);

  /*
   * The original date must be before the post date. If after extracting from
   * the description and parsed the transaction date is still after the post date
   * subtract 1 year. This case should only happens in dates closes to the end of
   * the year.
   */
  if (originalTxDate.isAfter(moment.utc(transaction.date))) {
    log.debug(
      `Original date [${originalTxDate.format(
        "YYYY-MM-DD"
      )}] cannot be greater then the post date [${
        transaction.date
      }] for transaction ${transaction.id}`
    );

    originalTxDate.subtract(1, "years");
  }

  // Update the tx date with the real one
  transaction.date = originalTxDate.format("YYYY-MM-DD");

  // Strip the date from the description and leave only the text.
  transaction.description = matches[1].trim();
}
