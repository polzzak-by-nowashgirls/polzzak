import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Input/Select';
import { formatDate, getTripDays, Schedule } from '@/lib/dateUtils';

function SelectMenu({ data }: { data: Schedule }) {
  const [selected, setSelected] = useState('Day1');

  const tripDays = getTripDays(data); // 예: 19일

  const selectItems = Array.from({ length: tripDays }, (_, i) => {
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
      <SelectTrigger>
        <SelectValue placeholder="Select a day" />
      </SelectTrigger>
      <SelectContent>{selectItems}</SelectContent>
    </Select>
  );
}

export default SelectMenu;
