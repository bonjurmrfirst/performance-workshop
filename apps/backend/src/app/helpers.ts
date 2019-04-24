export function chart() {
  const MOCK_HISTORY_DAYS_COUNT = 10;
  const getDate = (el, i) =>
    `${new Date().setDate(new Date().getDate() - MOCK_HISTORY_DAYS_COUNT + i)}, ${Math.random() * 100} \n`;

  return () => new Array(MOCK_HISTORY_DAYS_COUNT)
    .fill('')
    .map(getDate)
    .join('');
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
