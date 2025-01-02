import type { Locale } from "date-fns";

export const getDateFormat = (locale?: Locale) => {
  if (locale?.code === "en-US") return "MM/dd/yyyy";

  return "dd/MM/yyyy";
};
