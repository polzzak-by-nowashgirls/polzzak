import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from '../Label';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  hideLabel?: boolean;
}

function Textarea({ label, hideLabel, className, ...props }: TextareaProps) {
  const labelId = React.useId();

  return (
    <>
      <Label hideLabel={hideLabel} htmlFor={labelId}>
        {label}
      </Label>
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground placeholder:text-gray05 aria-invalid:ring-destructive/20 aria-invalid:border-destructive border-gray03 flex field-sizing-content max-h-[150px] min-h-[150px] w-full rounded-md border bg-transparent px-4 py-3 shadow-xs transition-[color,box-shadow]',
          'resize-none outline-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring placeholder:text-gray05 focus-visible:ring-[2px] focus-visible:ring-offset-2',
          'text-14 font-regular m-0.5',
          className,
        )}
        id={labelId}
        {...props}
      />
    </>
  );
}

export { Textarea };
