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

/**
 * Type guard to check if error is an internationalized error
 */
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
 * Extract displayable error message from various error formats
 * @param error - The error which could be a string, internationalized object, or null/undefined
 * @param locale - Preferred locale (defaults to 'en')
 * @param fallback - Fallback message if error cannot be parsed
 * @returns Displayable error message string
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
