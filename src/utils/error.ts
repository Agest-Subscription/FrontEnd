import { CustomError } from "@/interfaces/base";

export const getErrorDetail = (
  error: CustomError,
): string | undefined | null => {
  const errorDetail = error?.response?.data?.detail;

  if (typeof errorDetail === "string") {
    return errorDetail;
  } else if (Array.isArray(errorDetail)) {
    return errorDetail.join("\n") || undefined;
  }
};
