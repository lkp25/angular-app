import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {
  filteredTodosHigh: Observable<any[]>
  filteredTodosSmall: Observable<any[]>
  
  constructor() { }

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
      }),
      //add to share all subscriptions as one stream
      shareReplay()
    )
    this.filteredTodosHigh = todos$.pipe(
      map(data => data.filter((todo)=>todo.id >= 6))
    )
    this.filteredTodosSmall = todos$.pipe(
      map(data => data.filter((todo)=>todo.id < 6))
    )
    
    
    // http$.subscribe(
    //   data => console.log(data),
    //   noop,
    //   ()=> console.log('completed')      
    // )
    // todos$.subscribe(
    //   data => console.log(data),
    //   noop,
    //   ()=> console.log('completed')      
    // )

  }

}
