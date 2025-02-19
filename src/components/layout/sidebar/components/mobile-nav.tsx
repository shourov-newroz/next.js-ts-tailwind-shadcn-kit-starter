import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { menuItems, type MenuItem } from '@/config/menu';
import { hasAnyPermission } from '@/config/permission';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ChevronLeft, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { MenuGroup } from './menu-group';
import { OrganizationHeader } from './organization-header';
import { UserSection } from './user-section';

export const MobileNav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const { user } = useAuth();

  const isActiveRoute = useCallback(
    (path?: string) => {
      if (!path) return false;
      return pathname === path;
    },
    [pathname]
  );

  const hasActiveChild = useCallback(
    (item: MenuItem): boolean => {
      if (item.path && isActiveRoute(item.path())) return true;
      if (item.subMenu) {
        return item.subMenu.some((subItem: MenuItem) =>
          hasActiveChild(subItem)
        );
      }
      return false;
    },
    [isActiveRoute]
  );

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  }, []);

  const hasPermissionForItem = useCallback(
    (item: MenuItem): boolean => {
      if (!user?.permissions || !item.requiredPermissions?.length) return true;
      return hasAnyPermission(user.permissions, item.requiredPermissions);
    },
    [user?.permissions]
  );

  const hasPermissionForAnyChild = useCallback(
    (item: MenuItem): boolean => {
      if (!item.subMenu) return hasPermissionForItem(item);
      return item.subMenu.some((subItem: MenuItem) =>
        hasPermissionForItem(subItem)
      );
    },
    [hasPermissionForItem]
  );

  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            'relative flex size-10 items-center justify-center rounded-lg',
            'hover:bg-muted/50 hover:text-primary',
            'focus-visible:bg-muted focus-visible:ring-1 focus-visible:ring-primary',
            'transition-colors lg:hidden ml-auto',
            isMobileOpen && 'bg-muted/50 text-primary'
          )}
          aria-label='Open menu'
          aria-expanded={isMobileOpen}
        >
          <Menu
            className={cn(
              'size-5 transition-transform duration-200',
              isMobileOpen && 'rotate-90 scale-90'
            )}
            aria-hidden='true'
            strokeWidth={2.5}
          />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='flex w-full flex-col p-0 sm:max-w-[350px]'
        showClose={false}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center p-4 border-b'>
            <OrganizationHeader expanded />
            <Button
              variant='ghost'
              size='icon'
              className='size-9 hover:bg-muted/50 hover:text-primary'
              onClick={() => setIsMobileOpen(false)}
              aria-label='Close menu'
            >
              <ChevronLeft className='size-5' aria-hidden='true' />
            </Button>
          </div>
          <ScrollArea className='flex-1 px-3 py-4'>
            <div className='flex flex-col gap-2'>
              <nav
                className='flex flex-col gap-1'
                role='navigation'
                aria-label='Main'
              >
                {menuItems
                  .filter(
                    (item) => !item.isHidden && hasPermissionForAnyChild(item)
                  )
                  .map((item) => (
                    <MenuGroup
                      key={item.title}
                      item={item}
                      expanded
                      openGroups={openGroups}
                      toggleGroup={toggleGroup}
                      hasActiveChild={hasActiveChild}
                      hasPermissionForItem={hasPermissionForItem}
                      setIsMobileOpen={setIsMobileOpen}
                      isActiveRoute={isActiveRoute}
                    />
                  ))}
              </nav>
            </div>
          </ScrollArea>
          <UserSection expanded />
        </div>
      </SheetContent>
    </Sheet>
  );
};
