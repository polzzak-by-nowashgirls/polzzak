import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import buttonVariants from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { cn } from '@/lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('border-none p-2', className)}
      classNames={{
        months: 'max-w-[266px] m-auto',
        month: 'flex flex-col gap-4',
        caption: 'flex justify-center relative items-center w-full',
        caption_label: 'text-16 font-semibold',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          buttonVariants({ variant: 'tertiary' }),
          'text-center size-7 p-0 text-black cursor-pointer hover:text-primary-hover active:text-primary',
        ),
        nav_button_previous: 'absolute left-1 flex items-center justify-center',
        nav_button_next: 'absolute right-1 flex items-center justify-center',
        table: 'flex flex-col gap-2 w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell: 'flex-1 py-1 font-medium text-14 text-black',
        row: 'flex my-1',
        cell: cn(
          'flex flex-1 items-center justify-center relative font-medium text-14 focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has([aria-selected])]:bg-primary/20 [&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full [&:has(.day-today[aria-selected])]:rounded-full'
            : '[&:has([aria-selected])]:rounded-full',
        ),
        day: cn(
          buttonVariants({ variant: 'tertiary' }),
          'aspect-square flex-1 font-medium text-black rounded-full aria-selected:opacity-100 hover:bg-primary-hover hover:text-white cursor-pointer m-[3px] p-0 w-[32px] h-[32px]',
        ),
        day_range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-white',
        day_range_end:
          'day-range-end aria-selected:bg-primary aria-selected:text-white',
        day_selected: cn(
          'bg-primary hover:bg-primary-hover hover:text-white focus:bg-primary focus:text-white [&:has([aria-selected])]:text-primary',
          props.mode === 'range' ? 'text-black' : 'text-white',
        ),
        day_today:
          'bg-primary/20 text-primary hover:bg-primary-hover hover:text-white',
        day_outside: 'day-outside text-gray05 aria-selected:text-white',
        day_disabled: 'text-gray05 opacity-50',
        day_range_middle:
          'aria-selected:bg-transparent text-primary aria-selected:transparent',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <Icon
            id="arrow_left"
            className={cn('text-red-300', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <Icon
            id="arrow_right"
            className={cn('text-red-300', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

export default Calendar;
