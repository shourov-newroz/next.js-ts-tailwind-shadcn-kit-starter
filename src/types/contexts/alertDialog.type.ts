export type AlertType = 'info' | 'warning' | 'error' | 'success';

export type AlertAction = {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  onClick?: () => Promise<void> | void;
};

export type AlertDialogOptions = {
  title?: string;
  message: string | React.ReactNode;
  type?: AlertType;
  actions?: AlertAction[];
};

export interface IAlertDialogContext {
  open: boolean;
  title: string | null;
  message: string | React.ReactNode | null;
  type: AlertType;
  actions: AlertAction[];
  loadingId: string | null;
  showAlert: (options: AlertDialogOptions) => void;
  closeAlertDialog: () => void;
}

export interface IAlertDialogState {
  open: boolean;
  title: string | null;
  message: string | React.ReactNode | null;
  type: AlertType;
  actions: AlertAction[];
  loadingId: string | null;
}

export type IAlertDialogAction =
  | { type: 'SHOW_ALERT'; options: AlertDialogOptions }
  | { type: 'SET_LOADING'; actionId: string | null }
  | { type: 'CLOSE' };
