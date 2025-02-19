import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from './use-toast';

export function useFormServerErrors() {
  const [formServerErrors, setFormServerErrors] = useState<string[]>([]);

  const handleServerError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const errorReasons = error?.response?.data?.error?.reason;
      if (Array.isArray(errorReasons)) {
        setFormServerErrors(errorReasons);
      } else if (typeof errorReasons === 'string') {
        setFormServerErrors([errorReasons]);
      } else {
        setFormServerErrors([
          'An unexpected error occurred. Please try again.',
        ]);
      }
    } else {
      setFormServerErrors(['An unexpected error occurred. Please try again.']);
    }
    toast({
      title: 'Error',
      description: 'An error occurred. Please try again.',
      variant: 'invisible',
    });
  };

  const clearServerErrors = () => {
    setFormServerErrors([]);
  };

  return {
    formServerErrors,
    handleServerError,
    clearServerErrors,
  };
}
