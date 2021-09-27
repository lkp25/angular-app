import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('f') slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient
 
  constructor(private slServince: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slServince.startedEditing
      .subscribe(
        (index:number) =>{
          this.editMode = true
          this.editedItemIndex = index
          this.editedItem = this.slServince.getIngredient(index)
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }
  ngOnDestroy(){

  }

  onAddItem(form: NgForm){
    const value = form.value
    const newIngred = new Ingredient(value.name, value.amount)

    //are we in edit mode or ordinary?
    if(this.editMode){
      this.slServince.updateIngredient(this.editedItemIndex, newIngred)
    } else {

      this.slServince.addIngredient(newIngred)
      console.log(newIngred);
    }
    
  }

}
