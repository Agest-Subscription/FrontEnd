import { CustomError } from "@/interfaces/base";

export const getErrorDetail = (error: CustomError): string | undefined => {
  return error.response?.data?.detail;
};
