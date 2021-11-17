import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createPromoRangeValidator } from '../validators/date-range.validator';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
})
export class Step2Component implements OnInit {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    courseType: ['premium', [Validators.required]],
    price: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern('[0-9]+')
      ]
    ],
    promoStartAt: [null],
    promoEndAt: [null],
    thumbnail: [null]
  }, 
  //entire form options
  {
    validators: [createPromoRangeValidator()],
    // updateOn: "blur" --no to be set for file uploads couse no blur is possible!
  });

  ngOnInit(): void {
    //subscription to every value change:
    // disable price field if type of course is free - cross field disable
    this.form.valueChanges.subscribe(value =>{
      const priceField = this.form.controls["price"]
      //if is free and not yet disabled price - disable it:
      
      if(value.courseType == 'free' && priceField.enabled){
        //VERY IMPORTANT!!!! disabling a field is an event so it will trigger 
        //new value change and an infinite loop. to prevent it set this flag to false
        //so no event is emitted
        priceField.disable({emitEvent:false})
      }
      else if (value.courseType == 'premium' && priceField.disabled){
        priceField.enable({emitEvent:false})

      }
    })

  }

  //getters for template to check for errors on controls:
  get coursePrice() {
    return this.form.controls['price'];
  }
}
