import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef:ElementRef
  @ViewChild('amountInput') amountInputRef:ElementRef
 
  constructor(private slServince: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const name = this.nameInputRef.nativeElement.value
    const amount = this.amountInputRef.nativeElement.value
    const newIngred = new Ingredient(name, amount)
    this.slServince.addIngredient(newIngred)
    console.log(newIngred);
    
  }
}
