import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import Calendar from '@/components/Calendar/Calendar';

function CalendarCustom() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);

  const handleSelect = (range: DateRange | undefined) => {
    console.log('선택된 날짜:', range);
    setSelected(range);
  };

  return (
    <Calendar
      mode={'range'}
      selected={selected}
      onSelect={handleSelect}
      locale={ko}
      className="rounded-md border"
    />
  );
}

export default CalendarCustom;
