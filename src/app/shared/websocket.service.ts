import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  readonly URI: string = 'http://localhost:3000'
  public socket: any

  constructor() { 
    this.socket = io(this.URI) 
  }

  public listen(eventName: string){
    return new Observable(subscriber => {
      this.socket.on(eventName, (data)=>{
        subscriber.next(data)
      })
    })
  }

  public emit(eventName: string, data: any){
    this.socket.emit(eventName, data)
  }
}
