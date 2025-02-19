import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='py-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>{children}</div>
      </main>
    </div>
  );
};

export default PublicLayout;
