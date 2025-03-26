// 임시로 키와 타입 지정
export type Schedule = {
  startDate: Date;
  endDate: Date;
};

export function getTripDays(schedule: Schedule): {
  days: number;
  range: string;
} {
  const { startDate, endDate } = schedule;

  // 1. 날짜 차이 계산
  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const days = diffInDays + 1; // 'n박 n+1일' 기준

  // 2. 날짜 포맷 (YYYY.MM.DD)
  const format = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const range = `${format(startDate)} ~ ${format(endDate)}`;

  return { days, range };
}

export function formatDate(
  startDate: Date,
  offset: number,
  week: boolean = false,
): string {
  const start = new Date(startDate);
  start.setDate(start.getDate() + offset);

  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = weekdays[start.getDay()];

  if (week) {
    return `${month}.${day} ${dayOfWeek}`;
  } else {
    return `${month}.${day}`;
  }
}
