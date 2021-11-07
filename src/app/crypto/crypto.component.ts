import { Component, OnInit } from '@angular/core';

import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {
  public cryptoPrices

  constructor(
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
     this.cryptoService.getAllCrypto().subscribe(data => {
      console.log(data)
      this.cryptoPrices = data
    },
    error => console.log(error)
    )
  }

}
