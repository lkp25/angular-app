import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  editMode = false
  editedItemIndex: number
 
  constructor(private slServince: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slServince.startedEditing
      .subscribe(
        (index:number) =>{
          this.editMode = true
          this.editedItemIndex = index
        }
      )
  }
  ngOnDestroy(){

  }

  onAddItem(form: NgForm){
    const value = form.value

    const newIngred = new Ingredient(value.name, value.amount)
    this.slServince.addIngredient(newIngred)
    console.log(newIngred);
    
  }

}
