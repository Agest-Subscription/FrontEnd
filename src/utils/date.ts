import moment from "moment";

import { DATE_FORMAT } from "@/constants/date";

export const formatStringDate = (date?: string, format = DATE_FORMAT) => {
  if (!date) return "";

  return moment(date).format(format);
};
