const moment = require("moment");

const TX_DATE_FORMAT = "YYYY-MM-DD";
const YEAR_MONTH_FORMAT = "YYYY-MM";

class MonthStartDateRule {
  constructor({
    dayOfMonth = 25,
    currentMonth = false,
    manuallySetPeriods = [],
  } = {}) {
    this.dayOfMonth = dayOfMonth;
    this.currentMonth = currentMonth;
    this.manuallySetPeriods = manuallySetPeriods || [];
  }

  getMonth(txDateStr, dateFormat = TX_DATE_FORMAT) {
    const txDate = moment(txDateStr, dateFormat);

    return searchForDateInPeriod(txDate, this) || getMonthFromDay(txDate, this);
  }
}

function fixStartDate(startDate) {
  if (startDate.day() === 0) {
    startDate.subtract(2, "days");
  } else if (startDate.day() === 6) {
    startDate.subtract(1, "days");
  }
}

function searchForDateInPeriod(date = moment(), { manuallySetPeriods = [] }) {
  const period = manuallySetPeriods.find((manuallySet) =>
    date.isBetween(manuallySet.startDate, manuallySet.endDate, undefined, "[]")
  );

  return period ? period.month : undefined;
}

/**
 *
 * @param {moment.Moment} date
 * @param {MonthStartDateRule} rule
 * @returns
 */
function getMonthFromDay(date = moment(), rule) {
  const startDate = moment(date).date(rule.dayOfMonth);
  fixStartDate(startDate);

  let monthDate;
  if (rule.currentMonth) {
    monthDate = date.isBefore(startDate)
      ? moment(date).date(1).subtract(1, "months")
      : date;
  } else {
    monthDate = date.isBefore(startDate)
      ? date
      : moment(date).date(1).add(1, "months");
  }

  return monthDate.format(YEAR_MONTH_FORMAT);
}

exports.MonthStartDateRule = MonthStartDateRule;
exports.TX_DATE_FORMAT = TX_DATE_FORMAT;
exports.YEAR_MONTH_FORMAT = YEAR_MONTH_FORMAT;
