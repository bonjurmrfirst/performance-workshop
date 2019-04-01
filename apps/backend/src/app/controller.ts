import { Target } from '@performance-workshop/shared';
import { chart } from './helpers';

const casual = require('casual');
const chartFactory = chart();

export const api = (req, res) => {
  res.send({ message: `Welcome to backend!` });
};

export const targets = (req, res) => {
  res.json(<Target[]>new Array(100)
    .fill(() => null)
    .map(() => ({
      id: casual.uuid,
      name: casual.name,
      lat: casual.random,
      lng: casual.random,
      chart: chartFactory()
    })));
};
