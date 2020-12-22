import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendInfortoChatBoxService {
  private list = new BehaviorSubject<any>('Null');
  private listRoom = new BehaviorSubject<any>('Null');
  private mess = new BehaviorSubject<any>('Null');
  private messRoom = new BehaviorSubject<any>('Null');
  currentUser = this.list.asObservable();
  curreentMess = this.mess.asObservable();
  currentRoom = this.listRoom.asObservable();
  curreentMessRoom = this.messRoom.asObservable();
  constructor() { }
  sendUser(user,mess){
    this.list.next(user);
    this.mess.next(mess);
  }
  sendInforRoom(room,mess){
    this.listRoom.next(room);
    this.messRoom.next(mess);
  }

}
