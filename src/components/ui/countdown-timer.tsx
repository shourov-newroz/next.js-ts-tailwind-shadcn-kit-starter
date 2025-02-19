import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface CountdownTimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  className?: string;
  startTime?: number;
  isTimestamp?: boolean;
  initText?: string;
  expiredText?: string;
  restart?: boolean;
  countdownTimerClassName?: string;
}

export const CountdownTimer = ({
  initialSeconds,
  onExpire,
  className,
  startTime = Date.now(),
  isTimestamp = false,
  initText = 'Code expires in: ',
  expiredText,
  restart = false,
  countdownTimerClassName,
}: CountdownTimerProps) => {
  const [isExpired, setIsExpired] = useState(false);

  const calculateRemainingTime = () => {
    if (isExpired) return 0;

    if (isTimestamp) {
      // If startTime is a timestamp, calculate remaining time until that timestamp
      const remainingMs = startTime - Date.now();
      return Math.max(0, Math.floor(remainingMs / 1000));
    } else {
      // If startTime is a start time, calculate elapsed time since then
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      return Math.max(0, initialSeconds - elapsedSeconds);
    }
  };

  const [remainingSeconds, setRemainingSeconds] = useState(
    calculateRemainingTime()
  );

  useEffect(() => {
    // If already expired, don't start the timer
    if (isExpired) return;

    const timer = setInterval(() => {
      const newRemainingSeconds = calculateRemainingTime();
      setRemainingSeconds(newRemainingSeconds);

      if (newRemainingSeconds === 0) {
        clearInterval(timer);
        setIsExpired(true);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialSeconds, onExpire, startTime, isTimestamp, isExpired]);

  // Check if expired on mount
  useEffect(() => {
    const initialRemaining = calculateRemainingTime();
    if (initialRemaining === 0) {
      setIsExpired(true);
      onExpire?.();
    }
  }, []);

  // Reset timer when restart prop changes
  useEffect(() => {
    if (restart) {
      setIsExpired(false);
      setRemainingSeconds(calculateRemainingTime());
    }
  }, [restart]);

  if (isExpired || remainingSeconds === 0) {
    if (expiredText) {
      return (
        <span className={cn('font-medium text-destructive')}>
          {expiredText}
        </span>
      );
    }
    return null;
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className={cn('flex items-center', className)}>
      <span className={cn('text-gray-500')}>{initText} &nbsp;</span>
      <span className={cn('font-medium text-primary', countdownTimerClassName)}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};
