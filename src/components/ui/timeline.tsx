import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, X } from 'lucide-react';

// Define variants for different timeline styles
const timelineVariants = cva('relative', {
  variants: {
    size: {
      default: 'max-w-[90%]',
      full: 'w-full',
      compact: 'max-w-[70%]',
    },
    color: {
      default: '[--timeline-color:theme(colors.green.500)]',
      blue: '[--timeline-color:theme(colors.blue.500)]',
      purple: '[--timeline-color:theme(colors.purple.500)]',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
});

export interface TimelineStep {
  id: string | number;
  label: string;
  status: 'completed' | 'current' | 'upcoming' | 'rejected';
  statusText?: string;
  date?: string | null;
  description?: string;
}

interface TimelineProps extends VariantProps<typeof timelineVariants> {
  steps: TimelineStep[];
  className?: string;
  'aria-label'?: string;
}

export function Timeline({
  steps,
  className,
  size,
  color,
  'aria-label': ariaLabel = 'Progress Timeline',
}: TimelineProps) {
  return (
    <div
      className={cn(timelineVariants({ size, color }), className)}
      role='progressbar'
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={steps.length}
      aria-valuenow={steps.filter((step) => step.status === 'completed').length}
    >
      {/* Timeline Steps */}
      <div className='flex items-center'>
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-center',
                !isLast && 'flex-1',
                'group transition-opacity duration-200'
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'flex relative justify-center items-center w-8 h-8 rounded-full border-2',
                  'transition-all duration-300 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isCompleted
                    ? 'text-white bg-[var(--timeline-color)] border-[var(--timeline-color)]'
                    : step.status === 'rejected'
                    ? 'text-white border-destructive'
                    : isCurrent
                    ? 'bg-white text-[var(--timeline-color)] border-[var(--timeline-color)]'
                    : 'text-gray-400 bg-white border-gray-300',
                  'group-hover:scale-110'
                )}
                tabIndex={0}
                role='button'
                aria-label={`${step.label} - ${step.statusText || step.status}`}
              >
                {isCompleted ? (
                  <Check className='w-5 h-5 transition-transform duration-200' />
                ) : step.status === 'rejected' ? (
                  <X className='w-5 h-5 transition-transform duration-200 text-destructive' />
                ) : (
                  <span className='text-sm'>{index + 1}</span>
                )}
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 mx-2 h-[2px]',
                    'transition-all duration-300 ease-in-out',
                    isCompleted ? 'bg-[var(--timeline-color)]' : 'bg-gray-300'
                  )}
                  role='presentation'
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels and Status */}
      <div className='flex relative mt-3 w-full'>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                'relative',
                isLast ? 'w-8' : 'flex-1',
                !isLast && 'pr-4'
              )}
            >
              <div className='whitespace-nowrap'>
                <div
                  className={cn(
                    'mb-1 text-sm font-medium text-gray-700',
                    'transition-colors duration-200',
                    'group-hover:text-[var(--timeline-color)]'
                  )}
                >
                  {step.label}
                </div>
                <div
                  className={cn(
                    'text-sm transition-colors duration-200',
                    step.status === 'completed' &&
                      'text-[var(--timeline-color)]',
                    step.status === 'upcoming' && 'text-gray-400',
                    step.status === 'rejected' && 'text-destructive'
                  )}
                >
                  {step.statusText || step.status}
                </div>
                {step.description && (
                  <p className='mt-1 text-xs text-gray-500'>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
