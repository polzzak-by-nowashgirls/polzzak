import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Input/Select';
import { formatDate, getTripDays, Schedule } from '@/lib/dateUtils';

type SelectMenuProps = {
  data: Schedule;
  className?: string;
};

function SelectMenu({ data, className }: SelectMenuProps) {
  const [selected, setSelected] = useState('Day1');

  const { days } = getTripDays(data);

  const selectItems = Array.from({ length: days }, (_, i) => {
    const dayLabel = `Day${i + 1}`;
    const dateLabel = formatDate(data.startDate, i, false);

    return (
      <SelectItem key={dayLabel} value={dayLabel}>
        {dayLabel} ({dateLabel})
      </SelectItem>
    );
  });

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a day" />
      </SelectTrigger>
      <SelectContent>{selectItems}</SelectContent>
    </Select>
  );
}

export default SelectMenu;
