import moment from "moment";

export const TX_DATE_FORMAT = "YYYY-MM-DD";
export const YEAR_MONTH_FORMAT = "YYYY-MM";
export const LONG_YEAR_MONTH_FORMAT = "YYYY MMM";

function applyMonthStartDateRule(date, rule) {
  const period = searchForDateInPeriod(date, rule);

  return period ? new RefMonth(period.month) : getMonthFromDay(date, rule);
}

function searchForDateInPeriod(date = moment(), { manuallySetPeriods = [] }) {
  return manuallySetPeriods.find((manuallySet) =>
    date.isBetween(manuallySet.startDate, manuallySet.endDate, undefined, "[]")
  );
}

function fixStartDate(startDate) {
  if (startDate.day() === 0) {
    startDate.subtract(2, "days");
  } else if (startDate.day() === 6) {
    startDate.subtract(1, "days");
  }
}

function getMonthFromDay(date = moment(), { dayOfMonth, currentMonth }) {
  const startDate = moment(date).date(dayOfMonth);
  fixStartDate(startDate);

  let monthDate;
  if (currentMonth) {
    monthDate = date.isBefore(startDate)
      ? moment(date).date(1).subtract(1, "months")
      : date;
  } else {
    monthDate = date.isBefore(startDate)
      ? date
      : moment(date).date(1).add(1, "months");
  }

  return new RefMonth(monthDate);
}


export function getRefMonth({ dateStr, dateFormat = TX_DATE_FORMAT, rule }) {
  const date = moment(dateStr, dateFormat);
  return applyMonthStartDateRule(date, rule);
}

export function getCurrentRefMonth(rule) {
  if(!rule) {
    return new RefMonth(moment().date(1));
  }

  return applyMonthStartDateRule(moment(), rule);
}

export function getNextRefMonth(refMonth) {
  const date = moment(refMonth, YEAR_MONTH_FORMAT);

  return moment(date).add(1, 'months').format(YEAR_MONTH_FORMAT);
}

export function subtractRefMonth(refMonth, months) {
  const date = moment(refMonth, YEAR_MONTH_FORMAT);

  return moment(date).subtract(months, 'months').format(YEAR_MONTH_FORMAT);
}

/**
 * 
 * @param {RefMonth} from 
 * @param {RefMonth} to 
 * @returns 
 */
export function getMonths(from, to) {
  const diff = to.diff(from);

  if(diff === 1) {
    return [from, to];
  }

  const months = Array(diff - 1).fill().map((_, index) => {
    return new RefMonth(from.value).add(index + 1);
  });

  return [from, ...months, to];
}

export function getCurrentRefMonthPeriod(rule) {
  const date = moment();
  const manuallySetPeriod = searchForDateInPeriod(date, rule);

  if(manuallySetPeriod) {
    return {
      from: manuallySetPeriod.startDate,
      to: manuallySetPeriod.endDate,
    }
  }

  const { dayOfMonth, currentMonth } = rule;
  const startOrEndDate = moment(date).date(dayOfMonth);
  fixStartDate(startOrEndDate);

  let from, to;
  if (date.isBefore(startOrEndDate)) {
    const startDate = moment(date).date(dayOfMonth).subtract(1, "months");
    fixStartDate(startDate);

    from = startDate;
    to = startOrEndDate;
  } else {
    const endDate = moment(date).date(dayOfMonth).add(1, "months")
    fixStartDate(endDate);
    endDate.subtract(1, "days");

    from = startOrEndDate;
    to = endDate;
  }

  const firstDayOfMonth = moment(from).date(1);

  const referenceMonth = currentMonth ? moment(firstDayOfMonth) : moment(firstDayOfMonth).add(1, "months"); 

  return { from, to, referenceMonth};
}

export const formatDate = (date) => moment(date).format(TX_DATE_FORMAT);

export const formatRefMonth = (date, type = "short") => type === "short" ? moment(date).format(YEAR_MONTH_FORMAT) : moment(date).format(LONG_YEAR_MONTH_FORMAT);


export class RefMonth {
  constructor(value = moment()) {
    if(typeof value === "string") {
      this.value = moment(value, YEAR_MONTH_FORMAT);
    } else {
      this.value = moment(value);
    }
  }

  add(months) {
    this.value.add(months, 'months');
    return this;
  }

  diff(other) {
    return this.value.diff(other.value, 'months');
  }

  format(type = "short") {
    return type === "short" ? this.value.format(YEAR_MONTH_FORMAT) : this.value.format(LONG_YEAR_MONTH_FORMAT)
  }

  next() { 
    return new RefMonth(moment(this.value).add(1, 'months'));
  }
  
  subtract(months) { 
    this.value.subtract(months, 'months');
    return this;
  }

}