import { MOCK_DATA_FIELD_LENGTH } from './configuration';

export function chart() {
  const MOCK_HISTORY_DAYS_COUNT = 100;
  const getDate = (el, i) =>
    `${new Date().setDate(new Date().getDate() - MOCK_HISTORY_DAYS_COUNT + i)}, ${Math.random() * 100} \n`;

  return () => new Array(MOCK_HISTORY_DAYS_COUNT)
    .fill('')
    .map(getDate)
    .join('');
}

export const getTargetData = (): number[] => new Array(MOCK_DATA_FIELD_LENGTH)
  .fill(null)
  .map(item => Math.round(Math.random() * 1000));

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
