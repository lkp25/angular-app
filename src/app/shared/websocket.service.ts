import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
  socket: any
  listen(eventName: string){
    return new Observable(subscriber => {
      this.socket.on(eventName, (data)=>{
        subscriber.next(data)
      })
    })
  }
}
