/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as express from 'express';
import { Target } from '@performance-workshop/shared';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: `Welcome to backend!` });
});

app.get('/api/targets', (req, res) => {
  res.json(<Target[]>[{ id: 'id1', name: 'name1', lan: 1, lng: 2 }]);
});

const port = process.env.port || 3333;
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Listening at http://localhost:${port}`);
});
