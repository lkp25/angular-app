import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { courseTitleValidator } from '../validators/course-title.validator';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  form = this.fb.group({
    title: ['',{ 
      validators:[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)    
      ],
      //a function that returns a function
      asyncValidators:[courseTitleValidator(this.coursesService)],
      updateOn: "blur"
  }],

  })

  constructor(
    private fb: FormBuilder,
    //async validator needs it as argument!
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
  }

  get courseTitle(){
    return this.form.controls['title']
  }
}
