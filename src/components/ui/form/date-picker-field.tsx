import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  smallLabel?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

interface DatePickerFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  // disabledDates?: Date[];
  displayFormat?: string;
  asSingle?: boolean;
  useRange?: boolean;
  startFrom?: Date;
  showShortcuts?: boolean;
  showFooter?: boolean;
  separator?: string;
  containerClassName?: string;
  inputClassName?: string;
  toggleClassName?: string;
  popoverDirection?: 'up' | 'down';
}

export function DatePickerField<T extends FieldValues>({
  name,
  form,
  label,
  smallLabel,
  description,
  className,
  required = false,
  placeholder,
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  // disabledDates,
  displayFormat = 'DD/MM/YYYY',
  asSingle = true,
  useRange = false,
  startFrom,
  showShortcuts = false,
  showFooter = false,
  separator = '~',
  containerClassName,
  inputClassName,
  toggleClassName,
  popoverDirection,
}: DatePickerFieldProps<T>) {
  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className='flex gap-1 items-center'>
              {label}
              {smallLabel && (
                <span className='text-small text-muted-foreground leading-none'>
                  {smallLabel}
                </span>
              )}
              {required && <span className='text-destructive'>*</span>}
            </FormLabel>
          )}
          <Datepicker
            value={
              asSingle
                ? {
                    startDate: field.value,
                    endDate: field.value,
                  }
                : field.value
            }
            onChange={(value) => {
              if (asSingle) {
                field.onChange(value?.startDate || null);
              } else {
                field.onChange(value);
              }
            }}
            useRange={useRange}
            asSingle={asSingle}
            placeholder={placeholder}
            displayFormat={displayFormat}
            readOnly={readOnly}
            disabled={disabled}
            startFrom={startFrom}
            minDate={minDate}
            maxDate={maxDate}
            // disabledDates={disabledDates}
            showShortcuts={showShortcuts}
            showFooter={showFooter}
            separator={separator}
            containerClassName={cn(
              'relative w-full',
              error &&
                '[&_.react-datepicker__input-container_input]:border-destructive',
              containerClassName
            )}
            inputClassName={cn(
              'flex h-10 w-full rounded-md border bg-background px-3.5 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0',
              'disabled:cursor-default disabled:bg-input-disabled-background disabled:text-input-disabled-text disabled:border-input-border',
              error
                ? 'border-destructive focus-visible:ring-destructive'
                : 'border-input focus-visible:ring-ring enabled:hover:border-input-borderHover focus-visible:border-ring enabled:focus-visible:hover:border-ring',
              inputClassName
            )}
            toggleClassName={cn(
              'absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 focus:outline-none',
              'disabled:opacity-50 disabled:cursor-default',
              toggleClassName
            )}
            popoverDirection={popoverDirection}
          />
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
