import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DogcovidFormValidators } from './dogcovid-form-validators';
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
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      jaja: new FormControl(null, [Validators.required]),
      vaccines: new FormArray([], [])      
    }, [
      DogcovidFormValidators.maxNameLength, 
      DogcovidFormValidators.czyMaJajaGender,
      DogcovidFormValidators.mefedronNieDlaMalych,
      DogcovidFormValidators.minNumOfElements
    ])

  }

  submitDogForm(){
    console.log(this.dogForm);
    
  }
  
  selectVaccine(vaccineElement: HTMLElement, vaccineDetails){
    vaccineElement.classList.toggle('active')
    console.log(vaccineElement);

    if(vaccineElement.classList.contains('active')){
      (<FormArray>this.dogForm.get('vaccines')).push(new FormControl(vaccineDetails))
      return this.dogcovidService.addToCart(vaccineDetails)
    }
    (<FormArray>this.dogForm.get('vaccines'))
    .removeAt(this.dogForm.value.vaccines
      .findIndex((vaccine=> vaccineDetails.name === vaccine.name)))
    return this.dogcovidService.removeFromCart(vaccineDetails)

    
  }
  
}
