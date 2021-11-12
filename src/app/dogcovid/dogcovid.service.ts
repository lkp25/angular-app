import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogcovidService {
  vaccinesArray: Vaccine[] = [
    {
      name: "fajzer",
      price: 1200
    },
    {
      name: "astra klasik",
      price: 1900
    },
    {
      name: "rzonson",
      price: 500
    },
    {
      name: "mefedron",
      price: 2500
    }
  ]
  cart: Vaccine[]

  constructor() { }
  
  addToCart(vaccineDetails){
    
  }
  removeFromCart(vaccineDetails){

  }
  getCartTotal():number{
    return 
  }
}


export interface Vaccine{
  name: string,
  price: number
}