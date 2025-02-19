import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { routeConfig } from '@/config/routeConfig';
import useAuth from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { type UserSectionProps } from '../types';

const UserActions = () => {
  const { logout } = useAuth();

  return (
    <div className='flex flex-col gap-1 p-1'>
      <Button
        variant='ghost'
        className='flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm transition-colors hover:bg-muted/50'
        asChild
      >
        <Link href={routeConfig.profile.path()}>
          <User className='size-5' aria-hidden='true' />
          Profile
        </Link>
      </Button>
      <Button
        variant='ghost'
        className='flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm text-destructive transition-colors hover:bg-destructive/10'
        onClick={logout}
      >
        <LogOut className='size-5' aria-hidden='true' />
        Log out
      </Button>
    </div>
  );
};

export const UserSection = ({ expanded = true }: UserSectionProps) => {
  const { user } = useAuth();

  if (!expanded) {
    return (
      <div className='px-3 py-4 mt-auto border-t'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              className='justify-center px-2 py-3 w-full h-auto transition-colors hover:bg-muted/50'
              aria-label='User menu'
            >
              <div className='flex justify-center items-center rounded-full transition-transform size-10 bg-primary/10 text-primary hover:scale-105'>
                <User className='size-6' aria-hidden='true' />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side='right'
            className='p-0 w-56'
            align='start'
            alignOffset={-4}
          >
            <div className='p-2 border-b'>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{user?.name}</span>
                <span className='text-xs text-muted-foreground'>
                  {user?.email}
                </span>
              </div>
            </div>
            <UserActions />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className='px-3 py-4 mt-auto border-t'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='justify-start px-2 py-3 w-full h-auto transition-colors hover:bg-muted/50'
            aria-label='User menu'
          >
            <div className='flex gap-3 items-center'>
              <div className='flex justify-center items-center rounded-full transition-transform size-10 bg-primary/10 text-primary hover:scale-105'>
                <User className='size-6' aria-hidden='true' />
              </div>
              <div className='flex flex-col items-start text-left'>
                <span className='text-sm font-medium'>{user?.name}</span>
                <span className='text-xs text-muted-foreground'>
                  {user?.email}
                </span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <UserActions />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
