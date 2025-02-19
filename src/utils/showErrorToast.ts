import { toast } from '@/hooks/use-toast';
import { IServerErrorResponse } from '@/types/common';
import { AxiosError } from 'axios';

export const showErrorToast = (
  error: AxiosError<IServerErrorResponse>,
  fallbackMessage: string = 'Something went wrong. Please try again.'
) => {
  // Extract error reasons from the response
  const errorReasons = error?.response?.data?.error?.reason;
  const errorMessage = Array.isArray(errorReasons)
    ? errorReasons.join(', ') // Combine array of reasons into a single string
    : fallbackMessage;

  // Display toast
  toast({
    variant: 'destructive',
    title: errorMessage,
  });
};
