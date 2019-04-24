import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { LiveUpdate } from '../+state/grid.actions';
import * as fromGrid from '../+state/grid.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {
  private url = 'http://localhost:3333';
  private socket;

  constructor(private store: Store<fromGrid.GridState>) {}

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages() {
    return new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('Live Update', data => {
        console.log(':::Live Update Received:::');
        console.log(data);

        this.store.dispatch(new LiveUpdate(data));

        this.socket.emit('my other event', { my: 'data' });
      });
    });
  }
}
