import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { noop, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    Chart.register(...registerables);
  }
  @ViewChild('kadenaChart', { static: true }) kadenaChartRef: ElementRef;
  kadenaChart;
  kadenaChartLive;
  kdaPriceData = {
    price: [],
    time: [],
  };
  filteredTodos: Observable<any[]>
  

  @ViewChild('bitcoinChart', { static: true }) bitcoinChartRef: ElementRef;
  bitcoinChart;
  bitcoinChartLive;
  btcPriceData = {
    price: [],
    time: [],
  };

  ngOnInit(): void {
    function fetchData(url): Observable<any[]>{
      return Observable.create(observer =>{
        fetch(url)
        .then(response => {
          return response.json()
        }).then(body => {
          //emit value in observable and complete
          observer.next(body)
          observer.complete()
        }).catch(err => observer.error(err))
  
      })
    }
    const http$ = fetchData('https://jsonplaceholder.typicode.com/todos')
    const todos$ = http$.pipe(
      map(res => {
         res.length = 10
         return res
      })
    )
    this.filteredTodos = todos$.pipe(
      map(data => data.filter((todo)=>todo.id >= 6))
    )
    
    
    http$.subscribe(
      data => console.log(data),
      noop,
      ()=> console.log('completed')      
    )
    todos$.subscribe(
      data => console.log(data),
      noop,
      ()=> console.log('completed')      
    )


    //initial load
    this.getAllCryptoPrices();
    //load chart/s
    this.showKDAChart();
    this.showBTCChart();

    //interval load
    this.cryptoInterval = setInterval(() => {
      this.getAllCryptoPrices();
    }, 10000);
  }


  //generic method for updating price for any crypto
  updateCurrentTickValueForCrypto(
    freshData,
    cryptoChart,
    cryptoPriceDataArray,
    cryptoNameAcronym
  ) {
    //only 10 points on the chart
    if (cryptoPriceDataArray.price.length >= 10) {
      cryptoPriceDataArray.price.shift();
      cryptoPriceDataArray.time.shift();
    }
    //add newest data
    cryptoPriceDataArray.price.push(freshData[cryptoNameAcronym]);
    cryptoPriceDataArray.time.push(
      this.datePipe.transform(Date.now(), 'HH:mm:ss')
    );
    //WILL AUTOMATICALLY UPDATE ON ANY CHANGES TO THE ARRAYS!
    cryptoChart?.update();
  }

  getAllCryptoPrices() {
    this.cryptoService.getAllCrypto().subscribe(
      (data) => {
        this.cryptoPrices = data;

        //update for kadena:
        this.updateCurrentTickValueForCrypto(
          data,
          this.kadenaChartLive,
          this.kdaPriceData,
          'kda'
        );
        //update for bicoin:
        this.updateCurrentTickValueForCrypto(
          data,
          this.bitcoinChartLive,
          this.btcPriceData,
          'btc'
        );
      },
      (error) => console.log(error)
    );
  }

  showKDAChart() {
    

    this.kadenaChart = this.kadenaChartRef.nativeElement.getContext('2d');
   
    this.kadenaChartLive = new Chart(this.kadenaChart, {
      type: 'line', //horizontalBar, doughnut, line pie radar polar area
      data: {
        labels: this.kdaPriceData.time,
        datasets: [
          {
            label: 'KDA price',
            data: this.kdaPriceData.price,

            backgroundColor: 'green',
            borderColor: 'green',
            hoverBorderWidth: 5,
            hoverBorderColor: 'red',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Kadena tick-price chart',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
  showBTCChart() {
    this.bitcoinChart = this.bitcoinChartRef.nativeElement.getContext('2d');

    this.bitcoinChartLive = new Chart(this.bitcoinChart, {
      type: 'line', //horizontalBar, doughnut, line pie radar polar area
      data: {
        labels: this.btcPriceData.time,
        datasets: [
          {
            label: 'KDA price',
            data: this.btcPriceData.price,

            backgroundColor: 'red',
            borderColor: 'red',
            hoverBorderWidth: 3,
            hoverBorderColor: 'green',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Bitcoin tick-price chart',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }

  ngOnDestroy() {
    clearInterval(this.cryptoInterval);

    
  }
}
