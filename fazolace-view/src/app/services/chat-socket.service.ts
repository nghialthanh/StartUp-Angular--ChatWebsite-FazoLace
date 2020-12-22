import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})

export class ChatSocketService {
  socket: any
  readonly url: string = 'http://13.212.88.242:8080/';
  constructor() {
    this.setupConnection();
   }

  setupConnection() {
    this.socket = io.io(this.url, { transports: ['websocket']});
  }

  createconnection(){
    this.socket.emit('client-send-account_name',)
  }
  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }  
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
