import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',

  styleUrls: ['./courses.component.css'],
  // ===============================================================
  // custom error message for all forms must be enabled !!!!!!
  // ===========================================================
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError:true}
  }]
})
export class CoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(step1, step2, step3){
    console.log(step1);
    console.log(step2);
    console.log(step3);
    

  }
}
