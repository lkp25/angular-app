import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  readonly URI: string = 'http://localhost:3000'
  socket: any

  constructor() { 
    this.socket = io(this.URI) 
  }

  listen(eventName: string){
    return new Observable(subscriber => {
      this.socket.on(eventName, (data)=>{
        subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data)
  }
}
