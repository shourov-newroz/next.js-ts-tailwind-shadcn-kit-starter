import { type MenuItem } from '@/config/menu';
import { type HTMLAttributes } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
  organizationName?: string;
  organizationType?: string;
  onToggle?: () => void;
}

export interface MenuLinkProps {
  item: MenuItem;
  isSubmenu?: boolean;
  onClick?: () => void;
  expanded?: boolean;
  isActiveRoute: (path?: string) => boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export interface MenuGroupProps {
  item: MenuItem;
  expanded?: boolean;
  openGroups: string[];
  toggleGroup: (label: string) => void;
  hasActiveChild: (item: MenuItem) => boolean;
  hasPermissionForItem: (item: MenuItem) => boolean;
  setIsMobileOpen: (open: boolean) => void;
  isActiveRoute: (path?: string) => boolean;
}

export interface OrganizationHeaderProps {
  expanded?: boolean;
}

export interface UserSectionProps {
  expanded?: boolean;
}
