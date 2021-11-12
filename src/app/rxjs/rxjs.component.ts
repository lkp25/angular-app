
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, fromEvent, interval, merge, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, debounceTime, delayWhen, exhaustMap, filter, finalize, map, retryWhen, shareReplay, switchMap, throttle } from 'rxjs/operators';
import { RxjsFormService } from './rsxj_form.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, AfterViewInit {
@ViewChild('saveBtn') saveBtn: ElementRef

  filteredTodosHigh: Observable<any[] | Object>
  filteredTodosSmall: Observable<any[] | Object>
  obs1$: Observable<number>
  
  genders = ['male', 'female', 'wtf']

  mainForm: FormGroup
  constructor(private rxjsFormService: RxjsFormService) { }

  ngOnInit(): void {
   
    this.mainForm = new FormGroup({
           'username': new FormControl('default', Validators.required),
           'email': new FormControl('null', Validators.required),
           'gender': new FormControl('male', Validators.required)
         })
     
    this.mainForm.valueChanges.pipe(
      filter(()=> this.mainForm.valid),
      // debounceTime(3000),
      throttle(()=> interval(500)),
      switchMap(changes => this.rxjsFormService.getev())
      
    )    
    .subscribe()
    
    // const obs1$ = interval(1000)
    // const obs2 = obs1$.pipe(map(value=> value *10))

    // const obs3 = merge(obs1$, obs2)
    // obs3.subscribe()
   


    function fetchData(url): Observable<any[]>{
       //INSTANTIATE ABORT SIGNAL
      const controller = new AbortController()
      const signal = controller.signal

      return Observable.create(observer =>{
        fetch(url, {
          signal: signal, //ABORT SIGNAL PROVIDER!!!
          method: "GET",          
          headers: {
            "content-type":"application/json"
          }
        })
        .then(response => {
          if(response.ok){
            return response.json()
          } else {
            observer.error('request failed status:' + response.status);            
          }

        }).then(body => {
          //emit value in observable and complete
          observer.next(body)
          observer.complete()
        }).catch(err => observer.error(err))
        return controller.abort()
      })
    }
    
    const http$ = fetchData('https://jsonplaceholder.typicode.com/todos')
    const todos$ = this.rxjsFormService.getev().pipe(
      map(res => {
        //  res.length = 10
         return res
      }),
      //add to share all subscriptions as one stream
      shareReplay(),
      retryWhen(error => error.pipe(
        delayWhen(()=> timer(2000))
      ))
    )
    
    // this.filteredTodosHigh = todos$.pipe(
    //   map(data => data.filter((todo)=>todo.id >= 6))
    // )
    // this.filteredTodosSmall = todos$.pipe(
    //   map(data => data.filter((todo)=>todo.id < 6))
    // )
    this.filteredTodosHigh = todos$
        
    todos$.subscribe(
      data => console.log(data),
      noop,
      ()=> console.log('completed')      
    )

  }

  ngAfterViewInit(){
    //full access to the DOM guaranteed.
    fromEvent(this.saveBtn.nativeElement, 'click')
    .pipe(concatMap(()=> this.savetoDB(this.mainForm.value)))


  }
  
savetoDB(changes){
  //INSTANTIATE ABORT SIGNAL
  const controller = new AbortController()
  const signal = controller.signal

  return from(
    fetch(
      'https://jsonplaceholder.typicode.com/todos',
        { signal: signal, //ABORT SIGNAL PROVIDER!!!
          method: "GET",
          // body: JSON.stringify(changes),
          headers: {
            "content-type":"application/json"
          }
    })
    
    ) 
     
  }
}



