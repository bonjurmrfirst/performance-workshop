import * as express from 'express';
import * as morgan from 'morgan';
import * as controller from './app/controller';

const port = process.env.port || 3333;
const app = express();
const http = require('http').Server(app);

import { generateLiveUpdate } from './app/live-updates';
generateLiveUpdate(update => io.sockets.emit('Live Update', update));

const io = require('socket.io')(http);
io.origins('*:*');

io.on('connection', function(){
  console.log('::: User connected :::');
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
