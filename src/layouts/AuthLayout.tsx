import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-[450px]'>
        <div className='bg-white py-12 px-16 shadow-sm sm:rounded-lg border border-gray-100 space-y-4'>
          <div className='flex justify-center items-center'>
            <img src='/logo/full_logo.svg' alt='logo' className='h-10 w-auto' />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
