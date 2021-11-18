import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';


@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {

  state: Subject<string> = new Subject()

  cancel: Observable<string>
  //event to emit number of ms user holds the btn for
  @Output() holdTime: EventEmitter<number> = new EventEmitter()

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit(){
    this.state.next('cancel')
  }
  @HostListener('mouseleave', ['$event'])
  onHold(){
    console.log('%c started log', 'color:green; font-weight:bold;');
    this.state.next('start')
    const n = 100

    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v =>{
        this.holdTime.emit(v * n)
      }
      ])
    )
      
    }
  
  constructor() { }

}
