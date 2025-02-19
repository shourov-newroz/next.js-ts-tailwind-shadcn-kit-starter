import {
  AlertDialogOptions,
  IAlertDialogAction,
  IAlertDialogState,
} from '@/types/contexts/alertDialog.type';
import { ReactNode, useCallback, useReducer } from 'react';
import AlertDialogContext from './alertDialogContext';

const initialState: IAlertDialogState = {
  open: false,
  title: null,
  message: null,
  type: 'error',
  actions: [],
  loadingId: null,
};

const alertDialogReducer = (
  state: IAlertDialogState,
  action: IAlertDialogAction
): IAlertDialogState => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        open: true,
        title: action.options.title || null,
        message: action.options.message,
        type: action.options.type || 'error',
        actions:
          action.options.actions?.map((action) => ({
            ...action,
            id: action.id || Math.random().toString(36).slice(2),
          })) || [],
        loadingId: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loadingId: action.actionId,
      };
    case 'CLOSE':
      return {
        ...state,
        open: false,
        title: null,
        message: null,
        type: 'error',
        actions: [],
        loadingId: null,
      };
    default:
      return state;
  }
};

interface IAlertDialogProviderProps {
  children: ReactNode | ReactNode[];
}

const AlertDialogProvider = ({ children }: IAlertDialogProviderProps) => {
  const [state, dispatch] = useReducer(alertDialogReducer, initialState);

  const showAlert = useCallback((options: AlertDialogOptions) => {
    const enhancedActions = options.actions?.map((action) => ({
      ...action,
      onClick: action.onClick
        ? async () => {
            try {
              dispatch({ type: 'SET_LOADING', actionId: action.id });
              await action.onClick?.();
              dispatch({ type: 'CLOSE' });
            } catch (error) {
              console.error('Alert dialog action error:', error);
            } finally {
              dispatch({ type: 'SET_LOADING', actionId: null });
            }
          }
        : () => dispatch({ type: 'CLOSE' }),
    }));

    dispatch({
      type: 'SHOW_ALERT',
      options: { ...options, actions: enhancedActions },
    });
  }, []);

  const closeAlertDialog = useCallback(() => {
    dispatch({ type: 'CLOSE' });
  }, []);

  return (
    <AlertDialogContext.Provider
      value={{
        open: state.open,
        title: state.title,
        message: state.message,
        type: state.type,
        actions: state.actions,
        loadingId: state.loadingId,
        showAlert,
        closeAlertDialog,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};

export default AlertDialogProvider;
