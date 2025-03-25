import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  hideLabel?: boolean;
}

function Label({ className, hideLabel, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={`fs-14 lh mx-2 my-1 flex items-center gap-2 px-1 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${hideLabel && 'sr-only'} ${className}`}
      {...props}
    />
  );
}

export { Label };
