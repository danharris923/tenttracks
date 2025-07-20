import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const inputVariants = cva(
  // Base styles - mobile-first with accessibility
  'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
      },
      inputSize: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, label, error, helperText, id, ...props }, ref) => {
    const inputId = React.useId()
    const finalInputId = id || inputId
    const errorId = `${finalInputId}-error`
    const helperTextId = `${finalInputId}-helper`

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={finalInputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={finalInputId}
          type={type}
          className={cn(inputVariants({ variant: error ? 'error' : variant, inputSize, className }))}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            helperText && helperTextId
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// Textarea variant
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    error?: string
    helperText?: string
  }
>(({ className, label, error, helperText, id, ...props }, ref) => {
  const textareaId = React.useId()
  const finalTextareaId = id || textareaId
  const errorId = `${finalTextareaId}-error`
  const helperTextId = `${finalTextareaId}-helper`

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={finalTextareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={finalTextareaId}
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y',
          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
          className
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          error && errorId,
          helperText && helperTextId
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperTextId} className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  )
})
Textarea.displayName = 'Textarea'

export { Input, Textarea, inputVariants }