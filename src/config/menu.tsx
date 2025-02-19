import type { IPermissionValue } from '@/config/permission';
import { routeConfig } from '@/config/routeConfig';
import { type LucideIcon } from 'lucide-react';

export type MenuItem = {
  title: string;
  icon: LucideIcon;
  requiredPermissions?: readonly IPermissionValue[];
  description?: string;
  isHidden?: boolean;
} & (
  | {
      path: () => string;
      subMenu?: never;
    }
  | {
      path?: never;
      subMenu: MenuItem[];
    }
);

// Helper function to combine permissions from multiple menu items
export const combinePermissions = (
  items: MenuItem[]
): readonly IPermissionValue[] => {
  const allPermissions = items.flatMap(
    (item) => item.requiredPermissions || []
  );
  return [...new Set(allPermissions)];
};

export const menuItems: MenuItem[] = [
  {
    ...routeConfig.home,
    description: 'View home statistics and analytics',
  },
];
