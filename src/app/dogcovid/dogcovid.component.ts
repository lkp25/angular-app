import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { DogcovidService, Vaccine } from './dogcovid.service';

@Component({
  selector: 'app-dogcovid',
  templateUrl: './dogcovid.component.html',
  styleUrls: ['./dogcovid.component.css']
})
export class DogcovidComponent implements OnInit {
  dogForm: FormGroup
  totalPrice: number
  vaccines: Vaccine[] = this.dogcovidService.vaccinesArray

  constructor(private dogcovidService: DogcovidService) { }

  ngOnInit(): void {
    this.dogcovidService.totalToPay.subscribe(value => this.totalPrice = value)
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
  
  selectVaccine(vaccineElement: HTMLElement, vaccineDetails){
    vaccineElement.classList.toggle('active')
    console.log(vaccineElement);
    if(vaccineElement.classList.contains('active')){
      return this.dogcovidService.addToCart(vaccineDetails)
    }
    return this.dogcovidService.removeFromCart(vaccineDetails)

    
  }
  
}
