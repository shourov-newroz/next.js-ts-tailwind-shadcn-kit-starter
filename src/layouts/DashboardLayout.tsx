import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(true);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className='min-h-screen bg-background'>
      <Sidebar
        organizationName='Card Selling'
        organizationType='Enterprise'
        expanded={expanded}
        onToggle={handleToggle}
      />
      <div
        className={cn(
          'duration-300 transition-[padding]',
          expanded ? 'lg:pl-64' : 'lg:pl-16'
        )}
      >
        <main className='px-4 py-6 sm:px-6 lg:px-8'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
