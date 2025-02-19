import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Eye, UploadCloud, X } from 'lucide-react';
import * as React from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label?: string;
  smallLabel?: string;
  description?: string;
  className?: string;
  required?: boolean;
};

interface FileUploadFieldProps<T extends FieldValues>
  extends BaseFieldProps<T> {
  acceptedTypes?: string[];
  maxSize?: number;
  preview?: boolean;
  disabled?: boolean;
  height?: number;
  maxHeight?: number;
}

interface FileUploadContentProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  error?: FieldErrors<T>[Path<T>];
  acceptedTypes: string[];
  maxSize: number;
  disabled: boolean;
  height: number;
  preview: boolean;
  setPreviewOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

function FileUploadContent<T extends FieldValues>({
  field,
  error,
  acceptedTypes,
  maxSize,
  disabled,
  height,
  preview,
  setPreviewOpen,
  setDeleteDialogOpen,
}: FileUploadContentProps<T>) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        field.onChange(acceptedFiles[0]);
      }
    },
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection?.errors[0]?.code === 'file-too-large') {
        // Handle error through form context
        field.onChange(null);
      }
    },
    accept: acceptedTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {} as Accept
    ),
    maxSize: maxSize * 1024 * 1024,
    disabled,
    multiple: false,
  });

  const getFilePreview = React.useCallback((value: File | string | null) => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (
      typeof value === 'object' &&
      'type' in value &&
      typeof value.type === 'string' &&
      value.type.startsWith('image/')
    ) {
      return URL.createObjectURL(value as File);
    }
    return null;
  }, []);

  const previewUrl = getFilePreview(field.value);

  return (
    <div
      className={cn(
        'relative rounded-md border transition-colors',
        'focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-0',
        error
          ? 'border-destructive focus-within:ring-destructive'
          : 'border-input focus-within:ring-ring focus-within:border-ring',
        isDragActive && !disabled && 'border-primary bg-primary/5',
        disabled
          ? 'cursor-default bg-input-disabled-background border-input-border'
          : !error && 'hover:border-input-borderHover'
      )}
      style={{ height }}
    >
      {preview && field.value ? (
        <div className='flex relative justify-center items-center p-2'>
          <div className='overflow-hidden mx-auto rounded-md border bg-background w-fit'>
            {previewUrl ? (
              <div className='flex flex-col'>
                <div
                  className='flex justify-center items-center p-2'
                  style={{
                    height: disabled ? height - 22 : height - 54,
                  }}
                >
                  <img
                    src={previewUrl}
                    alt='Preview'
                    className='object-contain max-w-full max-h-full'
                    style={{ maxHeight: '100%' }}
                  />
                </div>
                {disabled && (
                  <div className='absolute top-1 right-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Eye
                            className='size-6 text-muted-foreground/80 hover:text-muted-foreground'
                            onClick={() => setPreviewOpen(true)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preview</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}

                {!disabled && (
                  <div className='flex w-full border-t'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='flex-1 h-[32px] text-[10px] rounded-none border-r text-secondary hover:bg-secondary/20'
                      onClick={() => setPreviewOpen(true)}
                    >
                      PREVIEW
                    </Button>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='flex-1 h-[32px] text-[10px] rounded-none text-destructive hover:bg-destructive/10 hover:text-destructive'
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      DELETE
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex gap-2 justify-between items-center py-3 pr-2 pl-4'>
                <div className='text-sm text-center text-muted-foreground'>
                  File uploaded (No preview available)
                </div>
                {!disabled && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-xs text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    DELETE
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'flex justify-center items-center p-2 w-full h-full min-h-max',
            !disabled && 'cursor-pointer',
            disabled && 'cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} accept={acceptedTypes.join(',')} />
          <div className='flex flex-col gap-2 items-center text-center'>
            <UploadCloud
              className={cn(
                'size-10',
                disabled ? 'text-input-disabled-text' : 'text-muted-foreground'
              )}
            />
            <div className='space-y-1'>
              <p
                className={cn(
                  'text-base font-medium',
                  disabled
                    ? 'text-input-disabled-text'
                    : 'text-muted-foreground'
                )}
              >
                {disabled ? 'No file uploaded' : 'Upload your files here'}
              </p>
              {!disabled && (
                <p className='text-sm text-muted-foreground'>
                  Or you can drag and drop your file
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FileUploadField<T extends FieldValues>({
  name,
  form,
  label,
  smallLabel,
  description,
  className,
  required = false,
  acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  maxSize = 5, // in MB
  preview = true,
  disabled = false,
  height = 167,
}: FileUploadFieldProps<T>) {
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const error = form.formState.errors[name];

        return (
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
              <FileUploadContent
                field={field}
                error={error}
                acceptedTypes={acceptedTypes}
                maxSize={maxSize}
                disabled={disabled}
                height={height}
                preview={preview}
                setPreviewOpen={setPreviewOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className='p-0 max-w-3xl' showClose={false}>
                <div className='relative'>
                  <Button
                    type='button'
                    size='icon'
                    variant='destructive'
                    className='absolute top-2 right-2 z-10'
                    onClick={() => setPreviewOpen(false)}
                  >
                    <X className='w-4 h-4' />
                  </Button>
                  {field.value && (
                    <img
                      src={
                        typeof field.value === 'string'
                          ? field.value
                          : URL.createObjectURL(field.value as File)
                      }
                      alt='Preview'
                      className='max-h-[80vh] w-full object-contain'
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent className=''>
                <DialogHeader className=''>
                  <DialogTitle>Delete File</DialogTitle>
                </DialogHeader>
                <p className='text-sm text-muted-foreground'>
                  Are you sure you want to delete this file?
                </p>
                <DialogFooter className='gap-2 sm:gap-0'>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => setDeleteDialogOpen(false)}
                    className='min-w-[80px]'
                  >
                    Cancel
                  </Button>
                  <Button
                    type='button'
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      field.onChange(null);
                      setDeleteDialogOpen(false);
                    }}
                    className='min-w-[100px]'
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormItem>
        );
      }}
    />
  );
}
