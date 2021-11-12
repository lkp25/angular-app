import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  cart = []
  totalToPay = new BehaviorSubject(0)

  constructor() { }
  
  addToCart(vaccineDetails){
    this.cart.push(vaccineDetails)
    this.calculateCartTotal()
    console.log(this.totalToPay);
   
    
  }
  removeFromCart(vaccineDetails){
    this.cart = this.cart.filter((obj)=> obj.name !== vaccineDetails.name)
    this.calculateCartTotal()
    console.log(this.totalToPay);
    
  }
  calculateCartTotal(){
    if(this.cart.length <= 0){
      this.totalToPay.next(0)
      return 0
    }
    let totalToPay = 0
    this.cart.forEach((item) => {
      totalToPay += item.price    
    })
    this.totalToPay.next(totalToPay)
    
  }
  
}


export interface Vaccine{
  name: string,
  price: number
}