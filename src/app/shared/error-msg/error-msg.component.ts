import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {
  @Input() msg = null
  msgRev = null 
  constructor() { }

  ngOnInit(): void {
    this.msgRev = Object.values(this.msg)[0]
    
  }

}
