import { routeConfig } from '@/config/routeConfig';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { type OrganizationHeaderProps } from '../types';

export const OrganizationHeader = ({
  expanded = true,
}: OrganizationHeaderProps) => (
  <div className={cn('flex items-center h-14', !expanded && 'justify-center')}>
    <div className='flex justify-center items-center w-full rounded-lg bg-background'>
      <Link href={routeConfig.home.path()} className='w-full'>
        <motion.div
          className='flex relative justify-center items-center'
          initial={false}
          animate={{
            width: expanded ? '100%' : '56px',
            height: '40px',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.img
            src='/logo/full_logo.svg'
            alt='Logo'
            className='object-contain w-full h-full'
            initial={false}
            animate={{
              opacity: expanded ? 1 : 0,
              scale: expanded ? 1 : 0.8,
            }}
            transition={{
              duration: 0.2,
            }}
          />
          <motion.img
            src='/logo/logo_icon.svg'
            alt='Logo'
            className='object-contain absolute w-full h-full'
            initial={false}
            animate={{
              opacity: expanded ? 0 : 1,
              scale: expanded ? 0.8 : 1.5,
            }}
            transition={{
              duration: 0.2,
            }}
          />
        </motion.div>
      </Link>
    </div>
  </div>
);
