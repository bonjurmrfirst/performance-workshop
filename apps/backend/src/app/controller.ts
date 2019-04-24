import { Target } from '@performance-workshop/shared';
import { chart } from './helpers';

const casual = require('casual');
const chartFactory = chart();

export const MOCK_ITEMS_COUNT = 50;

export const store: Target[] = <Target[]>new Array(MOCK_ITEMS_COUNT + 1)
  .fill(() => null)
  .map(() => ({
    id: casual.uuid,
    asd: casual.array_of_doubles(700),
    name: casual.name,
    lat: casual.random,
    lng: casual.random,
    calcField: ~~(Math.random() * 20),
    chart: chartFactory()
  }));

export const api = (req, res) => {
  res.send({ message: `Welcome to backend!` });
};

export const targets = (req, res) => {
  res.json(store);
};
