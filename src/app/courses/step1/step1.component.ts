import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { CoursesService } from '../courses.service';
import { courseTitleValidator } from '../validators/course-title.validator';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  categories$ = this.coursesService.findAllCourses()
 
 public form = this.fb.group({
    title: ['sss',{ 
      validators:[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)    
      ],
      //a function that returns a function
      asyncValidators:[courseTitleValidator(this.coursesService)],
      updateOn: "blur",      
  }],
    releasedAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]]

  })

  constructor(
    private fb: FormBuilder,
    //async validator needs it as argument!
    private coursesService: CoursesService
  ) { }

  //save draft to local storage on changes and load on init if any exists
  ngOnInit(): void {
    const draft = localStorage.getItem("STEP_1")
    if(draft){
      this.form.setValue(JSON.parse(draft))
    }
    
    this.form.valueChanges.pipe(
      //only let the value pass if form is valid, die otherwise
      filter(()=> this.form.valid),
      //wait for some time before saving      
      debounceTime(1500)
      
    ).subscribe(value =>{
      console.log(value);
      localStorage.setItem("STEP_1", JSON.stringify(value))
      
    })
  }

  get courseTitle(){
    return this.form.controls['title']
  }
}
