/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as express from 'express';
import * as morgan from 'morgan';
import * as controller from './app/controller';

const port = process.env.port || 3333;
const app = express();
const http = require('http').Server(app);

import { MOCK_ITEMS_COUNT, store } from './app/controller';
import { randomIntFromInterval } from './app/helpers';

setInterval(() => {
  console.log('Live Update');

  const itemsToUpdate = randomIntFromInterval(1, MOCK_ITEMS_COUNT);
  const updates = [];

  for (let i = 0; i < itemsToUpdate; i++) {
    const item = randomIntFromInterval(1, MOCK_ITEMS_COUNT);

    updates.push(store[item] = {
      ...store[item],
      lat: Math.random(),
      lng: Math.random()
    });
  }

  setImmediate(() => io.sockets.emit('Live Update', updates));
}, 3000);

const io = require('socket.io')(http);
io.origins('*:*');

io.on('connection', function(socket){
  console.log('a user connected');
});

app.use(morgan('combined'));

app.get('/api', controller.api);

app.get('/api/targets', controller.targets);

http.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Listening at http://localhost:${port}`);
});
