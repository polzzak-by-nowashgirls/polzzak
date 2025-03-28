import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import Calendar from '@/components/Calendar/Calendar';

function CalendarCustom() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range);
  };

  return (
    <Calendar
      mode={'range'}
      selected={selected}
      onSelect={handleSelect}
      locale={ko}
      className="rounded-md border"
      formatters={{
        formatCaption: (date) => format(date, 'yyyy년 M월', { locale: ko }),
      }}
    />
  );
}

export default CalendarCustom;
