import { getRandomInteger } from './helpers';
import { LIVE_UPDATES_INTERVAL, MOCK_ITEMS_COUNT } from './configuration';
import { store } from './controller';
import { Target } from '@performance-workshop/shared';

export const generateLiveUpdate = (cb: (update: Target[]) => void): void => {
  setInterval(() => {
    const itemsToUpdate = getRandomInteger(1, MOCK_ITEMS_COUNT);
    const updates = [];

    for (let i = 0; i < itemsToUpdate; i++) {
      const item = getRandomInteger(1, MOCK_ITEMS_COUNT);

      updates.push(store[item] = {
        ...store[item],
        lat: Math.random(),
        lng: Math.random()
      });
    }

    setImmediate(() => {
      cb(updates);

      console.log('::: Live Update Sent :::');
    });
  }, LIVE_UPDATES_INTERVAL);
};
