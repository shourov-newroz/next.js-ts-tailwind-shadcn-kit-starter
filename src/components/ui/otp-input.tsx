import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
  disabled,
}) => {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Update OTP state when value prop changes
    setOtp(value.split('').slice(0, length));
  }, [value, length]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (newValue.length > 1) {
      // Handle paste
      const pastedValue = newValue.slice(0, length);
      const newOtp = [...otp];
      for (let i = 0; i < pastedValue.length; i++) {
        if (index + i < length) {
          newOtp[index + i] = pastedValue[i];
        }
      }
      setOtp(newOtp);
      onChange(newOtp.join(''));
      focusInput(Math.min(index + pastedValue.length, length - 1));
    } else {
      // Handle single digit input
      const newOtp = [...otp];
      newOtp[index] = newValue;
      setOtp(newOtp);
      onChange(newOtp.join(''));
      if (newValue && index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      focusInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move to next input on right arrow
      focusInput(index + 1);
    }
  };

  return (
    <div className='flex gap-2 justify-center'>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className={cn(
            'size-[74px] text-center text-lg font-semibold rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all bg-background',
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
              : 'border-input focus:border-primary focus:ring-primary/30',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      ))}
    </div>
  );
};
