import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe
    ) {
      Chart.register(...registerables)
    }
  @ViewChild('myChart', {static:true}) chart: ElementRef
  chartCTX
  myChart

  kdaPriceData = {
    price: [],
    time: [ 
      
    ]
  }

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
        this.cryptoPrices = data;

        //only 10 points on the chart
        if(this.kdaPriceData.price.length >= 10){
          this.kdaPriceData.price.shift() 
          this.kdaPriceData.time.shift() 
        }  
        //add newest data
        this.kdaPriceData.price.push(data.kda)
        this.kdaPriceData.time.push(this.datePipe.transform(Date.now(),'shortTime'))        
        //WILL AUTOMATICALLY UPDATE ON ANY CHANGES TO THE ARRAYS!
        this.myChart.update()
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
    // this.chartCTX.canvas.clear()
    this.myChart = new Chart(this.chartCTX, {
      type: 'line', //horizontalBar, doughnut, line pie radar polar area 
      data: {
        labels: this.kdaPriceData.time,
        datasets: [{
          label: 'KDA price',
          data: this.kdaPriceData.price
        }]
      },
      options: {}
    }) 
    console.log(this.chartCTX.canvas);
    
  }
  
  
  

  
}
