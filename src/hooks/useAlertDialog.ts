import AlertDialogContext from '@/contexts/alertDialog/alertDialogContext';
import { IAlertDialogContext } from '@/types/contexts/alertDialog.type';
import { useContext } from 'react';

export default function useAlert(): IAlertDialogContext {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      'useAlertDialog must be used within an AlertDialogProvider'
    );
  }
  return context;
}
