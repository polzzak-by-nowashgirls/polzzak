import * as React from 'react';

import { Label } from '@/components/Label';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  type: 'text' | 'password' | 'button' | 'file';
  label: string;
  hideLabel?: boolean;
  children?: React.ReactNode;
}

function Input({
  className,
  type,
  label,
  hideLabel,
  children,
  ...props
}: InputProps) {
  const labelId = React.useId();

  const inputClassName = cn(
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-full file:cursor-pointer file:border-0 file:bg-transparent file:pr-2 file:font-medium',
    'focus-visible:ring-ring/50 placeholder:text-gray05 focus-visible:ring-[2px] focus-visible:ring-offset-2',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'border-input text-14 m-0.5 flex h-10 w-full min-w-0 items-center rounded-md border bg-transparent px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none',
    (type === 'file' || type === 'button') && 'cursor-pointer py-0',
    children && 'pr-14',
    className,
  );

  return (
    <div>
      <Label hideLabel={hideLabel} htmlFor={labelId}>
        {label}
      </Label>
      <div className={cn(children && 'relative')}>
        <input
          type={type}
          data-slot="input"
          className={`${inputClassName} ${type === 'button' && 'text-gray05 text-justify text-left'}`}
          id={labelId}
          {...props}
        />
        {children && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
