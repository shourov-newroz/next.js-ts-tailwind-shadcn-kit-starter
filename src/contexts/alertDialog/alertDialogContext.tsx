import {
  AlertType,
  IAlertDialogContext,
} from '@/types/contexts/alertDialog.type';
import { createContext } from 'react';

const initialState: IAlertDialogContext = {
  open: false,
  title: null,
  message: null,
  type: 'error' as AlertType,
  actions: [],
  loadingId: null,
  showAlert: () => {},
  closeAlertDialog: () => {},
};

const AlertDialogContext = createContext<IAlertDialogContext>(initialState);

export default AlertDialogContext;
