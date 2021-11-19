import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

}
