import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  // Base styles - mobile-first
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary-600 text-white hover:bg-primary-700',
        secondary:
          'border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        error:
          'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        info:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        outline:
          'border-gray-300 text-gray-700 hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-0.5 text-2xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, removable, onRemove, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current"
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Badge.displayName = 'Badge'

// Dot Badge variant for status indicators
const DotBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'variant'> & {
    variant?: 'online' | 'offline' | 'busy' | 'away'
  }
>(({ className, variant = 'offline', children, ...props }, ref) => {
  const dotColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700',
        className
      )}
      {...props}
    >
      <div
        className={cn('h-2 w-2 rounded-full', dotColors[variant])}
        aria-hidden="true"
      />
      {children}
    </div>
  )
})
DotBadge.displayName = 'DotBadge'

// Number Badge for counts
const NumberBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'children'> & {
    count: number
    max?: number
  }
>(({ className, variant = 'primary', size = 'sm', count, max = 99, ...props }, ref) => {
  const displayCount = count > max ? `${max}+` : count.toString()

  if (count === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        badgeVariants({ variant, size }),
        'min-w-[1.25rem] justify-center tabular-nums',
        className
      )}
      {...props}
    >
      {displayCount}
    </div>
  )
})
NumberBadge.displayName = 'NumberBadge'

export { Badge, DotBadge, NumberBadge, badgeVariants }