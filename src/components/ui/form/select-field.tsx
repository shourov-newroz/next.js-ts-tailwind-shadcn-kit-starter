import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CustomSelect, SelectOption } from '@/components/ui/select';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  smallLabel?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

export interface SelectFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  isLoading?: boolean;
  options: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  maxMenuHeight?: number;
}

export function SelectField<T extends FieldValues>({
  name,
  form,
  label,
  smallLabel,
  description,
  className,
  required = false,
  isLoading = false,
  options,
  disabled = false,
  placeholder = '',
  isClearable = false,
  isSearchable = true,
  menuPlacement = 'auto',
  maxMenuHeight = 200,
  ...props
}: SelectFieldProps<T>) {
  const hasError = !!form.formState.errors[name];

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
                <span className='leading-none text-small text-muted-foreground'>
                  {smallLabel}
                </span>
              )}
              {required && <span className='text-destructive'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <CustomSelect
              {...field}
              {...props}
              options={options}
              isDisabled={disabled}
              isLoading={isLoading}
              placeholder={placeholder}
              isClearable={isClearable}
              isSearchable={isSearchable}
              menuPlacement={menuPlacement}
              maxMenuHeight={maxMenuHeight}
              error={hasError}
              value={
                field.value
                  ? options.find((option) => option.value === field.value) ||
                    null
                  : null
              }
              onChange={(newValue) => field.onChange(newValue?.value ?? null)}
              aria-label={label}
              aria-invalid={hasError}
              aria-errormessage={hasError ? `${name}-error` : undefined}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage id={`${name}-error`} />
        </FormItem>
      )}
    />
  );
}
