import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { forwardRef } from 'react';
import { MobileNav } from './components/mobile-nav';
import { OrganizationHeader } from './components/organization-header';
import { SidebarContent } from './components/sidebar-content';
import { UserSection } from './components/user-section';
import { type SidebarProps } from './types';

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, expanded = true, onToggle }, ref) => {
    return (
      <>
        <MobileNav />
        <aside
          ref={ref}
          className={cn(
            'hidden fixed top-0 left-0 z-40 h-screen border-r backdrop-blur-xl bg-background/80 lg:block',
            expanded ? 'w-64' : 'w-18',
            className
          )}
          role='complementary'
          aria-label='Sidebar'
        >
          <div className='flex flex-col h-full'>
            <div
              className={cn(
                'flex items-center justify-between mb-6 px-3 py-2 mt-8',
                !expanded && 'justify-center flex-col gap-4'
              )}
            >
              <OrganizationHeader expanded={expanded} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='size-9'
                      onClick={onToggle}
                      aria-label={
                        expanded ? 'Collapse sidebar' : 'Expand sidebar'
                      }
                    >
                      <ChevronLeft
                        className={cn(
                          'size-6 transition-transform',
                          !expanded && 'rotate-180'
                        )}
                        aria-hidden='true'
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{expanded ? 'Close sidebar' : 'Open sidebar'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='overflow-auto flex-1 px-3'>
              <SidebarContent expanded={expanded} />
            </div>
            <UserSection expanded={expanded} />
          </div>
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';
