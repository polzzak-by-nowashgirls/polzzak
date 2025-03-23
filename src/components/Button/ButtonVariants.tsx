import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-md  font-[300] rounded-md transition-all [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive m-1 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-gray03 disabled:text-gray06',
        secondary:
          'border bg-white text-gray08 hover:bg-gray01 hover:text-gray07 active:border-primary active:text-primary disabled:bg-gray01 disabled:text-gray03',
        tertiary:
          'bg-white text-gray08 hover:text-primary-hover active:text-primary-active disabled:bg-white disabled:text-gray04',
        float:
          'absolute bottom-[16px] right-[16px] bg-primary/75 px-3 text-white rounded-3xl hover:bg-primary/85 active:bg-primary',
        input:
          'm-0 p-0 text-gray05 hover:text-primary-hover active:text-primary',
      },
      size: {
        default: 'h-[46px] px-3.5 [&_svg:not([class*="size-"])]:size-5',
        sm: 'h-[24px] gap-1 px-1.5 rounded-sm [&_svg:not([class*="size-"])]:size-3.5',
        md: 'h-[32px] px-2 rounded-md [&_svg:not([class*="size-"])]:size-4',
      },
    },
    compoundVariants: [
      {
        variant: 'input',
        class: 'w-[32px] h-[32px] rounded-sm',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
