import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { type MenuGroupProps } from '../types';
import { MenuLink } from './menu-link';

export const MenuGroup = ({
  item,
  expanded = true,
  openGroups,
  toggleGroup,
  hasActiveChild,
  hasPermissionForItem,
  setIsMobileOpen,
  isActiveRoute,
}: MenuGroupProps) => {
  const isOpen = openGroups.includes(item.title);
  const isActive = hasActiveChild(item);
  const Icon = item.icon;

  if (!item.subMenu) {
    return (
      <MenuLink
        item={item}
        expanded={expanded}
        isActiveRoute={isActiveRoute}
        setIsMobileOpen={setIsMobileOpen}
      />
    );
  }

  if (!expanded) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'flex justify-center items-center p-2 w-full rounded-lg transition-colors',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
            title={item.description}
            aria-label={item.title}
          >
            <Icon className='size-7' aria-hidden='true' />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side='right'
          className='p-1 w-56'
          align='start'
          alignOffset={-4}
        >
          <div
            className='flex flex-col gap-1'
            role='menu'
            aria-label={`${item.title} submenu`}
          >
            {item.subMenu
              .filter((subItem) => hasPermissionForItem(subItem))
              .map((subItem) => (
                <MenuLink
                  key={subItem.title}
                  item={subItem}
                  isSubmenu
                  expanded={expanded}
                  isActiveRoute={isActiveRoute}
                  setIsMobileOpen={setIsMobileOpen}
                />
              ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={() => toggleGroup(item.title)}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        )}
        title={item.description}
      >
        <div className='flex gap-3 items-center'>
          <Icon className='size-5' aria-hidden='true' />
          <span>{item.title}</span>
        </div>
        <ChevronDown
          className={cn('size-5 transition-transform', isOpen && 'rotate-180')}
          aria-hidden='true'
        />
      </CollapsibleTrigger>
      <CollapsibleContent className='py-2'>
        <div role='menu' aria-label={`${item.title} submenu`}>
          {item.subMenu
            .filter((subItem) => hasPermissionForItem(subItem))
            .map((subItem) => (
              <MenuLink
                key={subItem.title}
                item={subItem}
                isSubmenu
                expanded={expanded}
                isActiveRoute={isActiveRoute}
                setIsMobileOpen={setIsMobileOpen}
              />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
