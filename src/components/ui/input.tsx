import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'prefix'> {
  isError?: boolean;
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, prefix, disabled, ...props }, ref) => {
    const isEnabled = !disabled && !isError;
    return (
      <div
        className={cn(
          'flex w-full h-10 rounded-md border bg-background ring-offset-background focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-0',
          {
            'cursor-default bg-input-disabled-background text-input-disabled-text':
              disabled,
          },
          isError
            ? 'border-destructive focus-within:ring-destructive'
            : 'border-input focus-within:ring-ring  focus-within:border-ring ',
          isEnabled &&
            'hover:border-input-borderHover focus-within:hover:border-ring',
          className
        )}
      >
        {prefix && (
          <div
            className={cn(
              'flex items-center justify-center px-3.5 text-sm text-muted-foreground rounded-l-md border-r border-input bg-input-disabled-background',
              {
                'text-input-disabled-text': disabled,
              }
            )}
          >
            {prefix}
          </div>
        )}
        <input
          type={type}
          disabled={disabled}
          className={cn(
            'w-full h-full px-3.5 pb-0.5 text-sm bg-transparent border-0 outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
            'disabled:cursor-default disabled:bg-transparent',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
