export const DateNowToString = function () {
  return new Date().toISOString().split("T")[0].toString();
};

export const DateToString = function (date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export const DateNow = (): Date => new Date();
