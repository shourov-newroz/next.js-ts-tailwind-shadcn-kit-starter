import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CustomSelect, SelectOption } from '@/components/ui/select';
import { debounce } from 'lodash';
import * as React from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { InputActionMeta } from 'react-select';

export type ServerSelectOption = SelectOption;

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  smallLabel?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

interface ServerSelectFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  placeholder?: string;
  disabled?: boolean;
  loadingMessage?: string;
  noOptionsMessage?: string;
  isClearable?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  minCharacters?: number;
  debounceTimeout?: number;
  onInputChange?: (value: string, actionMeta: InputActionMeta) => void;
  loadOptions: (params: { search: string }) => Promise<ServerSelectOption[]>;
}

export function ServerSelectField<T extends FieldValues>({
  name,
  form,
  label,
  smallLabel,
  description,
  className,
  required = false,
  placeholder = 'Type to search...',
  disabled = false,
  loadingMessage = 'Loading...',
  noOptionsMessage = 'No options found',
  isClearable = false,
  menuPlacement = 'auto',
  minCharacters = 3,
  debounceTimeout = 800,
  onInputChange,
  loadOptions,
}: ServerSelectFieldProps<T>) {
  const [items, setItems] = React.useState<ServerSelectOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const hasError = !!form.formState.errors[name];

  const handleNoOptionsMessage = React.useCallback(
    ({ inputValue }: { inputValue: string }): React.ReactNode => {
      if (!inputValue) {
        return 'Type to search...';
      }
      if (inputValue.length < minCharacters) {
        return `Please enter at least ${minCharacters} characters to search`;
      }
      return noOptionsMessage;
    },
    [minCharacters, noOptionsMessage]
  );

  const handleLoadingMessage = React.useCallback(
    (): React.ReactNode => loadingMessage,
    [loadingMessage]
  );

  const handleSearch = React.useCallback(
    async (search: string) => {
      if (search.length < minCharacters) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const result = await loadOptions({ search });
        setItems(result);
      } catch (error) {
        console.error('Error fetching options:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [loadOptions, minCharacters]
  );

  const debouncedSearch = React.useMemo(
    () => debounce(handleSearch, debounceTimeout),
    [handleSearch, debounceTimeout]
  );

  const handleInputChange = React.useCallback(
    (value: string, actionMeta: InputActionMeta) => {
      if (onInputChange) {
        onInputChange(value, actionMeta);
      }
      debouncedSearch(value);
    },
    [onInputChange, debouncedSearch]
  );

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
              options={items}
              isDisabled={disabled}
              isLoading={loading}
              placeholder={placeholder}
              isClearable={isClearable}
              menuPlacement={menuPlacement}
              error={hasError}
              value={field.value}
              onChange={(newValue) => field.onChange(newValue ?? null)}
              onInputChange={handleInputChange}
              noOptionsMessage={handleNoOptionsMessage}
              loadingMessage={handleLoadingMessage}
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
