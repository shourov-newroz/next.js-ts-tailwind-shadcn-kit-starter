'use client';
import AlertDialog from '@/components/common/GlobalAlertDialog';
import { Toaster } from '@/components/ui/toaster';
import { swrConfig } from '@/config/swrConfig';
import AlertDialogProvider from '@/contexts/alertDialog/alertDialogProvider';
import { AuthProvider } from '@/contexts/auth/authContextProvider';
import 'react-loading-skeleton/dist/skeleton.css';
import { SWRConfig } from 'swr';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SWRConfig value={swrConfig}>
      <AlertDialogProvider>
        <AuthProvider>
          {children}
          <Toaster />
          <AlertDialog />
        </AuthProvider>
      </AlertDialogProvider>
    </SWRConfig>
  );
};

export default Providers;
