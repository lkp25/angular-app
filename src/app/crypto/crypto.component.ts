import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { interval } from 'rxjs';

import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
})
export class CryptoComponent implements OnInit, OnDestroy {
  public cryptoPrices;
  private cryptoInterval;
  constructor(
    private cryptoService: CryptoService,
    ) {
      Chart.register(...registerables)
    }
  @ViewChild('myChart', {static:true}) chart: ElementRef
  chartCTX
  

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

 
  doChart(){
    this.chartCTX = this.chart.nativeElement.getContext('2d')
    // console.log(this.chart.nativeElement);
    // console.log(this.chartCTX);
    
    const net = new Chart(this.chartCTX, {
      type: 'line', //horizontalBar, doughnut, line pie radar polar area 
      data: {
        labels: ['boston', 'worcestrer', 'spring', 'jira', 'angular'],
        datasets: [{
          label: 'population',
          data: [12345, 9234, 45123, 65326, 98441]
        }]
      },
      options: {}
  }) 
  }
  

  
}
