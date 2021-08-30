import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef:ElementRef
  @ViewChild('amountInput') amountInputRef:ElementRef
  @Output() passData = new EventEmitter<Ingredient>()
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const name = this.nameInputRef.nativeElement.value
    const amount = this.amountInputRef.nativeElement.value
    const newIngred = new Ingredient(name, amount)
    console.log(newIngred);
    
    this.passData.emit(newIngred)
  }
}
