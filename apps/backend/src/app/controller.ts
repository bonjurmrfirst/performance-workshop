import { Target } from '@performance-workshop/shared';
import { chart } from './helpers';

const casual = require('casual');
const chartFactory = chart();

export const MOCK_ITEMS_COUNT = 10;

export const store: Target[] = <Target[]>new Array(MOCK_ITEMS_COUNT)
  .fill(() => null)
  .map(() => ({
    id: casual.uuid,
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
