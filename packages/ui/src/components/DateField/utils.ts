import type { Locale } from "date-fns";

export const getDateFormat = (locale?: Locale) => {
  // Default to US format if no locale provided since that's what datefns and daypicker use
  if (!locale) return "MM/dd/yyyy";

  // Most non-US locales use DD/MM/YYYY
  // We can extend that by adding a switch per locale
  return "dd/MM/yyyy";
};
