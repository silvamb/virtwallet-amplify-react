const { MonthStartDateRule } = require("./month-start-date-rule");

describe("ReferenceMonth", () => {
  const currentMonthRule = {
    currentMonth: true,
    dayOfMonth: 25,
    manuallySetPeriods: null,
  };

  const lastMonthRule = {
    currentMonth: false,
    dayOfMonth: 25,
    manuallySetPeriods: null,
  };

  const manuallySetPeriodRule = {
    currentMonth: false,
    dayOfMonth: 25,
    manuallySetPeriods: [
      {
        startDate: "2019-12-20",
        endDate: "2020-01-23",
        month: "2020-01",
      },
    ],
  };

  it("should set current month when currentMonth is true and the date is after start date", () => {
    const rule = new MonthStartDateRule(currentMonthRule);
    const refMonth = rule.getMonth("2020-08-26");

    expect(refMonth).toEqual("2020-08");
  });

  it("should set previous month when currentMonth is true and the date is before the start date", () => {
    const rule = new MonthStartDateRule(currentMonthRule);
    const refMonth = rule.getMonth("2020-08-05");

    expect(refMonth).toEqual("2020-07");
  });

  it("should set current month when currentMonth is true and the date is equals the start date", () => {
    const rule = new MonthStartDateRule(currentMonthRule);
    const refMonth = rule.getMonth("2020-08-25");

    expect(refMonth).toEqual("2020-08");
  });

  it("should set next month when currentMonth is false and the date is after the start date", () => {
    const rule = new MonthStartDateRule(lastMonthRule);
    const refMonth = rule.getMonth("2020-08-28");

    expect(refMonth).toEqual("2020-09");
  });

  it("should set current month when currentMonth is false and the date is before the start date", () => {
    const rule = new MonthStartDateRule(lastMonthRule);
    const refMonth = rule.getMonth("2020-08-15");

    expect(refMonth).toEqual("2020-08");
  });

  it("should set the month when a date is between a manually inserted period", () => {
    const rule = new MonthStartDateRule(manuallySetPeriodRule);
    const refMonth = rule.getMonth("2019-12-22");

    expect(refMonth).toEqual("2020-01");
  });

  it("should set the month when a date is in the first day of a manually inserted period", () => {
    const rule = new MonthStartDateRule(manuallySetPeriodRule);
    const refMonth = rule.getMonth("2019-12-20");

    expect(refMonth).toEqual("2020-01");
  });

  it("should set the month when a date is the last day of a manually inserted period", () => {
    const rule = new MonthStartDateRule(manuallySetPeriodRule);
    const refMonth = rule.getMonth("2020-01-23");

    expect(refMonth).toEqual("2020-01");
  });

  it("should set the month when a date is after a manually inserted period", () => {
    const rule = new MonthStartDateRule(manuallySetPeriodRule);
    const refMonth = rule.getMonth("2020-01-24");

    expect(refMonth).toEqual("2020-02");
  });
});
