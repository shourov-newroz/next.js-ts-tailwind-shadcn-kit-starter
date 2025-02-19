import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useAlert from '@/hooks/useAlertDialog';
import { cn } from '@/lib/utils';
import { AlertAction } from '@/types/contexts/alertDialog.type';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  XCircle,
} from 'lucide-react';

const typeToIcon = {
  info: { icon: Info, className: 'text-blue-600 bg-blue-100' },
  success: { icon: CheckCircle, className: 'text-green-600 bg-green-100' },
  error: { icon: XCircle, className: 'text-red-600 bg-red-100' },
  warning: { icon: AlertTriangle, className: 'text-yellow-600 bg-yellow-100' },
};

const variantMapping = {
  primary: 'default',
  secondary: 'outline',
  danger: 'destructive',
  success: 'success',
} as const;

export default function GlobalAlertDialog() {
  const { open, title, message, type, actions, loadingId } = useAlert();

  const { icon: Icon, className: iconClassName } = typeToIcon[type];

  const renderActions = () => {
    return actions.map((action: AlertAction) => {
      const isLoading = loadingId === action.id;
      return (
        <Button
          key={action.id}
          onClick={action.onClick}
          disabled={!!loadingId}
          variant={action.variant ? variantMapping[action.variant] : 'default'}
          className={cn(
            action.variant !== 'secondary' ? 'min-w-[100px]' : 'min-w-[80px]'
          )}
          size={'sm'}
        >
          {isLoading && <Loader2 className='animate-spin' />}
          {action.label}
        </Button>
      );
    });
  };

  const renderMessage = () => {
    if (typeof message === 'string') {
      return <div className='text-sm text-muted-foreground'>{message}</div>;
    }
    return message;
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-start space-x-4'>
            <div
              className={cn(
                'flex justify-center items-center w-10 h-10 rounded-full shrink-0',
                iconClassName
              )}
            >
              <Icon className='w-6 h-6' />
            </div>
            <div className='flex-1'>
              {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
              <div className='mt-2 text-sm text-muted-foreground'>
                {renderMessage()}
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>{renderActions()}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
