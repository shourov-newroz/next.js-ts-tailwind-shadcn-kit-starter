import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface FormDialogFooterProps {
  isViewMode?: boolean;
  isSubmitting?: boolean;
  mode?: 'add' | 'edit' | 'view';
  onClose: () => void;
  submitLabel?: {
    add?: string;
    edit?: string;
  };
  clearLabel?: {
    add?: string;
    edit?: string;
  };
  className?: string;
  loadingLabel?: {
    add?: string;
    edit?: string;
  };
  buttonClassName?: string;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
}

export function FormDialogFooter({
  isViewMode = false,
  isSubmitting = false,
  mode = 'add',
  onClose,
  submitLabel = {
    add: 'Create',
    edit: 'Update',
  },
  clearLabel = {
    add: 'Cancel',
    edit: 'Cancel',
  },
  loadingLabel = {
    add: 'Creating...',
    edit: 'Updating...',
  },
  // className,
  buttonClassName = 'min-w-[120px] min-h-[36px]',
  submitButtonClassName,
  cancelButtonClassName,
}: FormDialogFooterProps) {
  return (
    <>
      {isViewMode ? (
        <Button
          type='button'
          variant='outline'
          onClick={onClose}
          className={cn(buttonClassName, cancelButtonClassName)}
        >
          Close
        </Button>
      ) : (
        <>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            className={cn(buttonClassName, cancelButtonClassName)}
            disabled={isSubmitting}
          >
            {mode === 'add' ? clearLabel.add : clearLabel.edit}
          </Button>
          <Button
            disabled={isSubmitting}
            type='submit'
            className={cn(
              buttonClassName,
              'bg-primary hover:bg-primary/90',
              submitButtonClassName
            )}
          >
            {isSubmitting ? (
              <span className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                {mode === 'add' ? loadingLabel.add : loadingLabel.edit}
              </span>
            ) : mode === 'add' ? (
              submitLabel.add
            ) : (
              submitLabel.edit
            )}
          </Button>
        </>
      )}
    </>
  );
}
