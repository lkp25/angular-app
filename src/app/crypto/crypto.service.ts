import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebsocketService } from '../shared/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) { }

  
  //only one call to the backend for all the data:
  getAllCrypto(){
    return this.websocketService.listen('received')
    // return this.http.get<any>('http://localhost:8080/crypto/all')

    // {
    //   headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    // })
  }
}
