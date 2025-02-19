import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, XCircle } from 'lucide-react';

interface FormErrorsProps {
  errors: string[];
  className?: string;
  title?: string;
  variant?: 'default' | 'compact' | 'toast';
  showErrorCount?: boolean;
}

const errorItemAnimation = {
  initial: { opacity: 0, x: -8 },
  animate: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export function FormErrors({
  errors,
  className,
  title = 'Failed to submit data',
  variant = 'default',
  showErrorCount = true,
}: FormErrorsProps) {
  if (!errors.length) return null;

  if (variant === 'compact') {
    return (
      <AnimatePresence mode='wait'>
        <div
          className={cn(
            'flex gap-2.5 items-center px-4 py-3 text-sm font-medium rounded-lg bg-destructive/10 text-destructive border border-destructive/20',
            className
          )}
          role='alert'
          aria-live='polite'
        >
          <AlertCircle className='size-5 shrink-0' strokeWidth={2} />
          <span className='line-clamp-3'>{errors[0]}</span>
        </div>
      </AnimatePresence>
    );
  }

  if (variant === 'toast') {
    return (
      <AnimatePresence mode='wait'>
        <div
          className={cn(
            'flex gap-3 items-start p-4 rounded-lg shadow-lg bg-destructive text-destructive-foreground',
            className
          )}
          role='alert'
          aria-live='polite'
        >
          <XCircle className='size-5 shrink-0 mt-0.5' strokeWidth={2} />
          <div className='space-y-1'>
            <p className='font-semibold'>{title}</p>
            <p className='text-sm opacity-90 line-clamp-2'>{errors[0]}</p>
          </div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <div
        className={cn(
          'overflow-hidden rounded-lg bg-destructive/[0.03] border border-destructive/25',
          className
        )}
        role='alert'
        aria-live='polite'
      >
        <div className='flex gap-4 px-4 py-4'>
          <XCircle
            className='size-6 shrink-0 text-destructive mt-0.5'
            strokeWidth={2}
          />
          <div className='flex-1 space-y-2 min-w-0'>
            <div className='flex flex-wrap gap-2 items-center'>
              <h4 className='font-medium text-[15px] text-destructive'>
                {title}
              </h4>
              {showErrorCount && errors.length > 1 && (
                <span className='inline-flex items-center rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive'>
                  {errors.length} errors
                </span>
              )}
            </div>
            <ul className='space-y-1.5'>
              {errors.map((error, index) => (
                <motion.li
                  key={error}
                  custom={index}
                  variants={errorItemAnimation}
                  initial='initial'
                  animate='animate'
                  className='flex gap-2.5 items-start text-[13.5px] text-destructive'
                >
                  <span className='mt-2 size-1.5 rounded-full bg-destructive/75 shrink-0' />
                  <span className='flex-1 font-medium leading-relaxed line-clamp-3 max-w-[450px]'>
                    {error}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
