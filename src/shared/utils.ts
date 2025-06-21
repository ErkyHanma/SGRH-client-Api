export const DateNowToString = function () {
  return new Date().toISOString().split("T")[0].toString();
};

export const DateNow = (): Date => new Date();
