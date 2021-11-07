import { Component, OnDestroy, OnInit } from '@angular/core';

import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
})
export class CryptoComponent implements OnInit, OnDestroy {
  public cryptoPrices;
  private cryptoInterval;
  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    //initial load
    this.getAllCryptoPrices()
    //interval load
    this.cryptoInterval = setInterval(() => {
     this.getAllCryptoPrices()
    }, 10000);
  }

  getAllCryptoPrices(){
    this.cryptoService.getAllCrypto().subscribe(
      (data) => {
        console.log(data);
        this.cryptoPrices = data;
      },
      (error) => console.log(error)
    );
  }
  ngOnDestroy(){
    clearInterval(this.cryptoInterval)
  }
}
