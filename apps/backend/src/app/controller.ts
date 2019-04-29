import { Target } from '@performance-workshop/shared';
import { chart } from './helpers';
import { MOCK_DATA_FIELD_LENGTH, MOCK_ITEMS_COUNT } from './configuration';

const casual = require('casual');
const chartFactory = chart();

export const store: Target[] = <Target[]>new Array(MOCK_ITEMS_COUNT + 1)
  .fill(() => null)
  .map(() => ({
    id: casual.uuid,
    data: casual.array_of_doubles(MOCK_DATA_FIELD_LENGTH),
    name: casual.name,
    lat: casual.random,
    lng: casual.random,
    index: ~~(Math.random() * 20),
    chart: chartFactory()
  }));

export const api = (req, res) => {
  res.send({ message: `Welcome to backend!` });
};

export const targets = (req, res) => {
  res.json(store);
};
