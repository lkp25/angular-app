import { Directive, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';


@Directive({
  selector: '[holdable]'
})
export class HoldableDirective implements OnInit {
  
  constructor() {
    
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v =>{
        console.log('%c stopped hold', 'color:red; font-weight:bold;');
        this.holdTime.emit(0)
      })
      )
    }
    state: Subject<string> = new Subject()
    
    cancel: Observable<string>
    
    //event to emit number of ms user holds the btn for
    @Output() holdTime: EventEmitter<number> = new EventEmitter()
    
    ngOnInit(){
      this.state.subscribe(v => console.log(v))
      this.cancel.subscribe(v => console.log(v))
    }

    @HostListener('mouseup', ['$event'])
    @HostListener('mouseleave', ['$event'])
    onExit(){
      this.state.next('cancel')
      
      
    }
    
    @HostListener('mousedown', ['$event'])
  onHold(){
    console.log('%c started log', 'color:green; font-weight:bold;');
    this.state.next('start')
    const n = 100

    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v =>{
        this.holdTime.emit(v * n)
        console.log(v * n)
      }
      )
    )
      
  }
    
  

}
