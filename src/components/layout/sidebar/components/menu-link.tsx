import { cn } from '@/lib/utils';
import Link from 'next/link';
import { type MenuLinkProps } from '../types';

export const MenuLink = ({
  item,
  isSubmenu = false,
  onClick,
  expanded = true,
  isActiveRoute,
  setIsMobileOpen,
}: MenuLinkProps) => {
  const Icon = item.icon;
  const path = item.path?.();

  if (!path) return null;

  return (
    <Link
      href={path}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
        isActiveRoute(path)
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        expanded && isSubmenu && 'ml-5',
        !expanded && !isSubmenu && 'justify-center'
      )}
      onClick={() => {
        onClick?.();
        setIsMobileOpen(false);
      }}
      title={item.description}
      role='menuitem'
    >
      <Icon
        className={cn(
          'size-5 transition-transform group-hover:scale-110',
          !expanded && !isSubmenu && 'size-7'
        )}
        aria-hidden='true'
      />
      <span
        className={cn(
          'transition-opacity',
          !expanded && !isSubmenu && 'hidden'
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};
