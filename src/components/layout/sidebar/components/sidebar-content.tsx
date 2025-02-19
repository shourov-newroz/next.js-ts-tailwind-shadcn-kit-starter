import { menuItems, type MenuItem } from '@/config/menu';
import { hasAnyPermission } from '@/config/permission';
import useAuth from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { MenuGroup } from './menu-group';

interface SidebarContentProps {
  expanded?: boolean;
}

export const SidebarContent = ({ expanded = true }: SidebarContentProps) => {
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

  const filteredMenuItems = useMemo(
    () =>
      menuItems.filter(
        (item) => !item.isHidden && hasPermissionForAnyChild(item)
      ),
    [hasPermissionForAnyChild]
  );

  return (
    <div className='flex flex-col gap-2'>
      <nav className='flex flex-col gap-1' role='navigation' aria-label='Main'>
        {filteredMenuItems.map((item) => (
          <MenuGroup
            key={item.title}
            item={item}
            expanded={expanded}
            openGroups={openGroups}
            toggleGroup={toggleGroup}
            hasActiveChild={hasActiveChild}
            hasPermissionForItem={hasPermissionForItem}
            setIsMobileOpen={() => {}}
            isActiveRoute={isActiveRoute}
          />
        ))}
      </nav>
    </div>
  );
};
