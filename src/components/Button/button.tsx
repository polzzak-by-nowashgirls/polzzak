import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const useButtonVariants = () =>
  React.useMemo(
    () =>
      cva(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-[300] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer',
        {
          variants: {
            variant: {
              default:
                'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
              secondary:
                'border bg-white text-gray08 hover:bg-gray01 hover:text-gray07 active:border-primary active:text-primary',
              tertiary:
                'bg-white text-gray08 hover:text-primary-hover active:text-primary-active',
            },
            size: {
              default: 'h-10 px-4 py-2 has-[>svg]:px-3',
              sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
              lg: 'h-11 rounded-md px-6 has-[>svg]:px-4',
              icon: 'size-9',
            },
          },
          defaultVariants: {
            variant: 'default',
            size: 'default',
          },
        },
      ),
    [],
  );

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<ReturnType<typeof useButtonVariants>> & {
    asChild?: boolean;
  }) {
  const buttonVariants = useButtonVariants();
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
