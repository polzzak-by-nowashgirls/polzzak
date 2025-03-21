import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import ButtonVariants from '@/components/Button/Button';
import SvgIcon from '@/components/Icon/Icon';
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
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'w-[280px] m-auto flex flex-col gap-3',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          ButtonVariants({ variant: 'tertiary' }),
          'size-7 p-0 text-black cursor-pointer hover:text-primary-hover active:text-primary',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell:
          'flex-1 bg-gray-20 text-black rounded-md font-medium text-14',
        row: 'flex w-full',
        cell: cn(
          // 'w-10 relative p-1 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/20',
          'flex-1 relative p-1 text-center text-sm focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has([aria-selected])]:bg-primary/20 [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has(.day-today[aria-selected])]:rounded-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          ButtonVariants({ variant: 'tertiary' }),
          'size-8 p-0 font-medium rounded-sm aria-selected:opacity-100 hover:bg-primary-hover hover:text-white cursor-pointer',
        ),
        day_range_start:
          'day-range-start aria-selected:bg-primary aria-selected:text-white',
        day_range_end:
          'day-range-end aria-selected:bg-primary aria-selected:text-white',
        day_selected:
          'bg-primary hover:bg-primary-hover hover:text-white focus:bg-primary focus:text-white [&:has([aria-selected])]:text-primary',
        day_today:
          'bg-primary/20 text-primary hover:bg-primary-hover hover:text-white',
        day_outside:
          'day-outside text-muted-foreground aria-selected:text-white',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-transparent text-primary aria-selected:transparent',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <SvgIcon
            id="arrow-large-left"
            className={cn('size-4', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <SvgIcon
            id="arrow-large-right"
            className={cn('size-4', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

export default Calendar;
