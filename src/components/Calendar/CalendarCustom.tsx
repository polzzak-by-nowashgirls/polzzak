import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import Calendar from '@/components/Calendar/Calendar';

interface CalendarCustomProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

function CalendarCustom({ selected, onSelect }: CalendarCustomProps) {
  return (
    <Calendar
      mode={'range'}
      selected={selected}
      onSelect={onSelect}
      locale={ko}
      className="rounded-md border"
      formatters={{
        formatCaption: (date) => format(date, 'yyyy년 M월', { locale: ko }),
      }}
    />
  );
}

export default CalendarCustom;
