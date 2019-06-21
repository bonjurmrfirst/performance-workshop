import { Target } from '@performance-workshop/shared';
import { chart, getTargetData } from './helpers';
import { MOCK_ITEMS_COUNT } from './configuration';

const casual = require('casual');
const chartFactory = chart();

export const store: Target[] = <Target[]>new Array(MOCK_ITEMS_COUNT + 1)
  .fill(() => null)
  .map(() => ({
    id: casual.uuid,
    data: getTargetData(),
    name: casual.name,
    lat: casual.random,
    lng: casual.random,
    index: 1,
    chart: chartFactory()
  }));

export const api = (req, res) => {
  res.send({ message: `API is up and running` });
};

export const targets = (req, res) => {
  res.json(store);
};
