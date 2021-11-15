import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  form = this.fb.group({
    title: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    
    ]],

  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
