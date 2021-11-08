import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private http: HttpClient
  ) { }

  
  getAllCrypto(){
    
    return this.http.get<any>('http://localhost:8080/crypto/all')
    // {
    //   headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    // })
  }
}
