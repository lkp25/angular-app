import { EventEmitter, Injectable } from '@angular/core';
import { Recipie } from '../recipies/recipe-model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipieService{

    recipieSelected = new EventEmitter<Recipie>()
    
    private  recipies: Recipie[] = [
        new Recipie(
            "sznitzel", 
            'dsadsadsadsadsadsadad', 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU",
            [
                new Ingredient('shznitzel', 2)
            ]
            ),
        new Recipie(
            "dfdsfsdfde", 
            'dsadaaaaaaaaaaaaAAAAAAAadad', 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU",
            [
                new Ingredient('french fries', 20),
                new Ingredient('bread', 1)
            ]
            )
    ]

    constructor(private slService: ShoppingListService){}

    getRecipies(){
        return this.recipies.slice() //return a copy
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }
}