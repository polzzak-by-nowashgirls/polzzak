export function formatBr(data) {
  const text = data
    .split('<br>')
    .map((line: string, idx: number) => <p key={idx}>{line}</p>);

  return text;
}
