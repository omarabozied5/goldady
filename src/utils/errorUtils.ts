// utils/errorUtils.ts

export interface InternationalizedError {
  en: string;
  ar: string;
}

export type ErrorType =
  | string
  | InternationalizedError
  | Error
  | null
  | undefined;

const isInternationalizedError = (
  error: any
): error is InternationalizedError => {
  return error && typeof error === "object" && "en" in error && "ar" in error;
};

/**
 * Type guard to check if error has a message property
 */
const hasMessage = (error: any): error is { message: string } => {
  return (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  );
};

/**

 * @param error 
 * @param locale 
 * @param fallback 
 * @returns 
 */
export const getErrorMessage = (
  error: ErrorType,
  locale: "en" | "ar" = "en",
  fallback: string = "An unexpected error occurred"
): string => {
  if (!error) {
    return fallback;
  }

  if (typeof error === "string") {
    return error;
  }

  if (isInternationalizedError(error)) {
    return error[locale] || error.en || fallback;
  }

  if (hasMessage(error)) {
    return error.message;
  }

  return fallback;
};
