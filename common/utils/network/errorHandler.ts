import { toast } from "react-hot-toast";

type ErrorWithMessage = {
  message: string
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

const convertToErrorWithMessage = (processedError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(processedError)) {
    return processedError
  }

  try {
    return new Error(JSON.stringify(processedError))
  } catch {
    return new Error(String(processedError))
  }
}

export const handleFetchError = (error: unknown, fallbackMessage = '') => {
  const errorMsg = convertToErrorWithMessage(error).message;
  console.error(errorMsg);
  toast.error(errorMsg || fallbackMessage);
}
