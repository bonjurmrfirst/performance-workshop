import { Target } from '@performance-workshop/shared';

export const api = (req, res) => {
  res.send({ message: `Welcome to backend!` });
};

export const targets = (req, res) => {
  res.json(<Target[]>[{ id: '1', name: 'name1', lat: 1, lng: 2 }]);
};
