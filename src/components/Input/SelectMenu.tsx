import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Input/Select';
import { formatDate, getTripDays, Schedule } from '@/lib/dateUtils';

interface SelectMenuProps {
  data: Schedule | 'email';
  className?: string;
  onSelectedEmail?: (email: string) => void;
}

function SelectMenu({ data, className, onSelectedEmail }: SelectMenuProps) {
  const [daySelected, setDaySelected] = useState('Day1');

  const emailArr = ['naver.com', 'gmail.com', '직접 입력'];

  if (data === 'email') {
    return (
      <Select onValueChange={(value) => onSelectedEmail?.(value)}>
        <SelectTrigger className={className}>
          <SelectValue placeholder="이메일 선택" />
        </SelectTrigger>
        <SelectContent>
          {emailArr.map((email) => (
            <SelectItem key={email} value={email}>
              {email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } else {
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
      <Select value={daySelected} onValueChange={setDaySelected}>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Select a day" />
        </SelectTrigger>
        <SelectContent>{selectItems}</SelectContent>
      </Select>
    );
  }
}

export default SelectMenu;
