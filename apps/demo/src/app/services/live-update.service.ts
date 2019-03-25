import { Subject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiveUpdateService {
  private url = 'http://localhost:3333';
  private socket;

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }
}
