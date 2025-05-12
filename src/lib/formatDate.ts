export function formatDate(dateStr: string) {
  if (dateStr.length !== 8) return dateStr; // 형식이 안 맞으면 그대로 반환

  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  return `${year}년 ${month}월 ${day}일`;
}
