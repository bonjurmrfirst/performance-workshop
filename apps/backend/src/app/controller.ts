import { Target } from '@performance-workshop/shared';

export const api = (req, res) => {
  res.send({ message: `Welcome to backend!` });
};

export const targets = (req, res) => {
  res.json(<Target[]>[{ id: 'id1', name: 'name1', lan: 1, lng: 2 }]);
};
