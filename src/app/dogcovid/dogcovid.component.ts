import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dogcovid',
  templateUrl: './dogcovid.component.html',
  styleUrls: ['./dogcovid.component.css']
})
export class DogcovidComponent implements OnInit {
  dogForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.dogForm = new FormGroup({
      'size': new FormControl(null),
      'breed': new FormControl(null),
      'gender': new FormControl(null),
      'name': new FormControl(null),
      'jaja': new FormControl(null),
      
    })

  }

  submitDogForm(){
    console.log(this.dogForm);
    
  }
  
}
