import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-[300] transition-all [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive m-1 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-gray03 disabled:text-gray06',
        secondary:
          'border bg-white text-gray08 hover:bg-gray01 hover:text-gray07 active:border-primary active:text-primary disabled:bg-gray01 disabled:text-gray03',
        tertiary:
          'bg-white text-gray08 hover:text-primary-hover active:text-primary-active disabled:bg-white disabled:text-gray04',
      },
      size: {
        default:
          'h-[46px] px-3.5 rounded-md [&_svg:not([class*="size-"])]:size-5',
        sm: 'h-[24px] gap-1 px-1.5 rounded-sm [&_svg:not([class*="size-"])]:size-3.5',
        md: 'h-[32px] px-2 [&_svg:not([class*="size-"])]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button;
