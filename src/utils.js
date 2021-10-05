import { formatRelative, subDays } from "date-fns";

export function prettifyDate(isoDateString) {
  return formatRelative(subDays(Date.parse(isoDateString), 0), new Date());
}
