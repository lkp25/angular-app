import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    lessons: this.fb.array([])
  })

  ngOnInit(): void {
  }

  //convenient getter for form array
  get lessons(){
    return this.form.controls['lessons'] as FormArray
  }
  addLesson(){
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required],
    })

    this.lessons.push(lessonForm)
  }

  deleteLesson(i){
    this.lessons.removeAt(i)
  }
}
