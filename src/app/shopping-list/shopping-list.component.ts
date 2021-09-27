import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private igChangeSub: Subscription

  ingredients: Ingredient[]
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients()

    this.igChangeSub =  this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }
  ngOnDestroy(){
    this.igChangeSub.unsubscribe()
  }

  onEditItem(index){
    this.slService.startedEditing.next(index)
  }
}
